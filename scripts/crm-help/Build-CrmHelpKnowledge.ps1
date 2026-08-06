[CmdletBinding()]
param(
    [string]$RootPath,
    [string]$OutputPath,
    [string]$ReportPath,
    [switch]$ValidateOnly
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$ValidationErrors = New-Object Collections.Generic.List[string]
$ValidationWarnings = New-Object Collections.Generic.List[string]
$ExpectedSupportedLocales = @("es-ES")

function Write-Utf8File {
    param(
        [Parameter(Mandatory = $true)][string]$Path,
        [Parameter(Mandatory = $true)][string]$Content
    )

    $parent = Split-Path -Parent $Path
    if (-not (Test-Path -LiteralPath $parent)) {
        New-Item -ItemType Directory -Path $parent -Force | Out-Null
    }
    [IO.File]::WriteAllText($Path, ($Content -replace "`r`n", "`n"), $script:Utf8NoBom)
}

function Write-JsonFile {
    param(
        [Parameter(Mandatory = $true)][string]$Path,
        [Parameter(Mandatory = $true)]$Value
    )

    Write-Utf8File -Path $Path -Content (($Value | ConvertTo-Json -Depth 40) + "`n")
}

function Add-ValidationError {
    param([Parameter(Mandatory = $true)][string]$Message)
    $script:ValidationErrors.Add($Message)
}

function Add-ValidationWarning {
    param([Parameter(Mandatory = $true)][string]$Message)
    $script:ValidationWarnings.Add($Message)
}

function Read-JsonFile {
    param([Parameter(Mandatory = $true)][string]$Path)

    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        Add-ValidationError "Missing JSON file: $Path"
        return $null
    }

    try {
        return [IO.File]::ReadAllText($Path, $script:Utf8NoBom) | ConvertFrom-Json
    }
    catch {
        Add-ValidationError "Invalid JSON file '$Path': $($_.Exception.Message)"
        return $null
    }
}

function Get-StringArray {
    param($Value)
    if ($null -eq $Value) { return @() }
    return @($Value | ForEach-Object { [string]$_ })
}

function Get-CanonicalHash {
    param(
        [Parameter(Mandatory = $true)][string]$Root,
        [Parameter(Mandatory = $true)][string[]]$Files
    )

    $lines = New-Object Collections.Generic.List[string]
    foreach ($file in $Files | Sort-Object -Unique) {
        $resolved = [IO.Path]::GetFullPath($file)
        $relative = $resolved.Substring($Root.Length).TrimStart("\", "/").Replace("\", "/")
        $hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $resolved).Hash
        $lines.Add("$relative|$hash")
    }
    $bytes = $script:Utf8NoBom.GetBytes(($lines -join "`n"))
    $sha = [Security.Cryptography.SHA256]::Create()
    try {
        return ([BitConverter]::ToString($sha.ComputeHash($bytes))).Replace("-", "")
    }
    finally {
        $sha.Dispose()
    }
}

function Get-ModelMarkdown {
    param([Parameter(Mandatory = $true)][string]$Markdown)

    $value = [regex]::Replace($Markdown, "(?m)^#\s+.+?\r?$", "")
    $value = [regex]::Replace($value, "<!--.*?-->", "", [Text.RegularExpressions.RegexOptions]::Singleline)
    # Keeps image metadata out of the reader text while assets remain separately traceable.
    $value = [regex]::Replace($value, "!\[[^\]]*\]\([^)]+\)", "")
    return $value.Trim()
}

function Get-ImageReferences {
    param(
        [Parameter(Mandatory = $true)][string]$Markdown,
        [Parameter(Mandatory = $true)][string]$ContentPath,
        [Parameter(Mandatory = $true)]$AssetByAbsolutePath
    )

    $references = New-Object Collections.Generic.List[string]
    foreach ($match in [regex]::Matches($Markdown, "!\[[^\]]*\]\((?<path>[^)]+)\)")) {
        $relative = $match.Groups["path"].Value
        $absolute = [IO.Path]::GetFullPath((Join-Path (Split-Path -Parent $ContentPath) $relative))
        if (-not $AssetByAbsolutePath.ContainsKey($absolute)) {
            Add-ValidationError "Markdown '$ContentPath' references an asset outside the manifest: $relative"
            continue
        }
        $assetId = [string]$AssetByAbsolutePath[$absolute]
        if (-not $references.Contains($assetId)) {
            $references.Add($assetId)
        }
    }
    return @($references | ForEach-Object { $_ })
}

function New-TopicChunks {
    param(
        [Parameter(Mandatory = $true)]$Topic,
        [Parameter(Mandatory = $true)][string]$Markdown,
        [Parameter(Mandatory = $true)][string]$ContentPath,
        [Parameter(Mandatory = $true)]$AssetByAbsolutePath,
        [int]$MaximumCharacters = 6000
    )

    $rawBody = [regex]::Replace($Markdown, "(?m)^#\s+.+?\r?$", "")
    $rawBody = [regex]::Replace($rawBody, "<!--.*?-->", "", [Text.RegularExpressions.RegexOptions]::Singleline).Trim()
    if ([string]::IsNullOrWhiteSpace($rawBody)) {
        return @()
    }

    $blocks = @([regex]::Split($rawBody, "(?:\r?\n){2,}") | Where-Object { -not [string]::IsNullOrWhiteSpace($_) })
    $chunks = New-Object Collections.Generic.List[object]
    $currentBlocks = New-Object Collections.Generic.List[string]
    $chunkIndex = 0

    $flushChunk = {
        if ($currentBlocks.Count -eq 0) { return }
        $chunkIndex++
        $chunkMarkdown = (($currentBlocks -join "`n`n").Trim())
        $chunkBody = Get-ModelMarkdown -Markdown $chunkMarkdown
        $assetIds = Get-ImageReferences -Markdown $chunkMarkdown -ContentPath $ContentPath -AssetByAbsolutePath $AssetByAbsolutePath
        $chunks.Add([ordered]@{
            id = "$($Topic.id)--{0:D2}" -f $chunkIndex
            heading = [string]$Topic.title
            body = $chunkBody
            imageRefs = [string[]]@($assetIds | Where-Object { $_ })
            estimatedTokens = [int][Math]::Ceiling($chunkBody.Length / 4.0)
        })
        $currentBlocks.Clear()
    }

    foreach ($block in $blocks) {
        $candidateLength = if ($currentBlocks.Count -eq 0) { $block.Length } else { (($currentBlocks -join "`n`n").Length + 2 + $block.Length) }
        if ($candidateLength -gt $MaximumCharacters -and $currentBlocks.Count -gt 0) {
            & $flushChunk
        }

        if ($block.Length -le $MaximumCharacters) {
            $currentBlocks.Add($block.Trim())
            continue
        }

        $sentences = @([regex]::Split($block.Trim(), "(?<=[.!?])\s+") | Where-Object { $_ })
        foreach ($sentence in $sentences) {
            $sentenceCandidateLength = if ($currentBlocks.Count -eq 0) { $sentence.Length } else { (($currentBlocks -join " ").Length + 1 + $sentence.Length) }
            if ($sentenceCandidateLength -gt $MaximumCharacters -and $currentBlocks.Count -gt 0) {
                & $flushChunk
            }
            $currentBlocks.Add($sentence.Trim())
        }
    }
    & $flushChunk

    return @($chunks | ForEach-Object { $_ })
}

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
if (-not $RootPath) {
    $RootPath = Join-Path $repoRoot "docs\crm-help"
}
$RootPath = (Resolve-Path -LiteralPath $RootPath).Path.TrimEnd("\")
if (-not $OutputPath) {
    $OutputPath = Join-Path $RootPath "generated\crm-help.bundle.json"
}
if (-not $ReportPath) {
    $ReportPath = Join-Path $RootPath "generated\validation-report.json"
}

$knowledgePath = Join-Path $RootPath "knowledge.json"
$knowledge = Read-JsonFile $knowledgePath
$navigation = if ($knowledge) { Read-JsonFile (Join-Path $RootPath ([string]$knowledge.navigationPath)) } else { $null }
$assetManifest = if ($knowledge) { Read-JsonFile (Join-Path $RootPath ([string]$knowledge.assetManifestPath)) } else { $null }
$supportedLocales = @(if ($knowledge) { Get-StringArray $knowledge.supportedResponseLocales } else { @() })

$canonicalFiles = New-Object Collections.Generic.List[string]
if (Test-Path -LiteralPath $knowledgePath) { $canonicalFiles.Add($knowledgePath) }
if ($knowledge -and (Test-Path -LiteralPath (Join-Path $RootPath ([string]$knowledge.navigationPath)))) { $canonicalFiles.Add((Join-Path $RootPath ([string]$knowledge.navigationPath))) }
if ($knowledge -and (Test-Path -LiteralPath (Join-Path $RootPath ([string]$knowledge.assetManifestPath)))) { $canonicalFiles.Add((Join-Path $RootPath ([string]$knowledge.assetManifestPath))) }

$moduleById = @{}
$topicById = @{}
$topicSourceById = @{}
$assetById = @{}
$assetByAbsolutePath = @{}
$localizationByLocale = @{}
$localizedModuleByLocale = @{}
$localizedTopicByLocale = @{}

if ($knowledge) {
    if ([string]$knowledge.schemaVersion -ne "1.1") { Add-ValidationError "knowledge.json schemaVersion must be '1.1'." }
    if ([string]::IsNullOrWhiteSpace([string]$knowledge.knowledgeVersion)) { Add-ValidationError "knowledge.json knowledgeVersion is required." }
    if ([string]::IsNullOrWhiteSpace([string]$knowledge.defaultLocale)) { Add-ValidationError "knowledge.json defaultLocale is required." }
    if ([string]$knowledge.defaultLocale -ne "es-ES") { Add-ValidationError "knowledge.json defaultLocale must be 'es-ES'." }
    if ($supportedLocales -notcontains [string]$knowledge.defaultLocale) { Add-ValidationError "knowledge.json defaultLocale must be supported." }
    if ($supportedLocales.Count -ne $ExpectedSupportedLocales.Count -or @(Compare-Object -ReferenceObject $ExpectedSupportedLocales -DifferenceObject $supportedLocales).Count -ne 0) {
        Add-ValidationError "knowledge.json supportedResponseLocales must contain exactly: $($ExpectedSupportedLocales -join ', ')."
    }

    $localizationPathsProperty = $knowledge.PSObject.Properties["localizationMetadataPaths"]
    if ($null -eq $localizationPathsProperty) {
        Add-ValidationError "knowledge.json localizationMetadataPaths is required."
    }
    else {
        foreach ($locale in $supportedLocales) {
            $pathProperty = $knowledge.localizationMetadataPaths.PSObject.Properties[$locale]
            if ($null -eq $pathProperty -or [string]::IsNullOrWhiteSpace([string]$pathProperty.Value)) {
                Add-ValidationError "knowledge.json has no localization metadata path for locale '$locale'."
                continue
            }

            $localizationPath = Join-Path $RootPath ([string]$pathProperty.Value).Replace("/", "\")
            $localization = Read-JsonFile $localizationPath
            if (-not $localization) { continue }
            $canonicalFiles.Add($localizationPath)

            if ([string]$localization.schemaVersion -ne "1.0") { Add-ValidationError "Localization '$locale' schemaVersion must be '1.0'." }
            if ([string]$localization.locale -ne $locale) { Add-ValidationError "Localization '$localizationPath' declares locale '$($localization.locale)' instead of '$locale'." }
            if ([string]$localization.status -notin @("source", "machine-draft", "reviewed")) { Add-ValidationError "Localization '$locale' has invalid status '$($localization.status)'." }
            if ([string]::IsNullOrWhiteSpace([string]$localization.title)) { Add-ValidationError "Localization '$locale' has no Manual title." }
            if ($locale -eq [string]$knowledge.defaultLocale -and [string]$localization.title -ne [string]$knowledge.title) {
                Add-ValidationError "Default-locale Manual title differs from knowledge.json."
            }

            $moduleMap = @{}
            foreach ($localizedModule in @($localization.modules)) {
                $localizedModuleId = [string]$localizedModule.id
                if ([string]::IsNullOrWhiteSpace($localizedModuleId)) { Add-ValidationError "Localization '$locale' contains a module without id."; continue }
                if ($moduleMap.ContainsKey($localizedModuleId)) { Add-ValidationError "Localization '$locale' repeats module '$localizedModuleId'."; continue }
                $moduleMap[$localizedModuleId] = $localizedModule
            }

            $topicMap = @{}
            foreach ($localizedTopic in @($localization.topics)) {
                $localizedTopicId = [string]$localizedTopic.id
                if ([string]::IsNullOrWhiteSpace($localizedTopicId)) { Add-ValidationError "Localization '$locale' contains a topic without id."; continue }
                if ($topicMap.ContainsKey($localizedTopicId)) { Add-ValidationError "Localization '$locale' repeats topic '$localizedTopicId'."; continue }
                $topicMap[$localizedTopicId] = $localizedTopic
            }

            $localizationByLocale[$locale] = $localization
            $localizedModuleByLocale[$locale] = $moduleMap
            $localizedTopicByLocale[$locale] = $topicMap
        }
    }

    $sourcePath = Join-Path $repoRoot ([string]$knowledge.source.path).Replace("/", "\")
    if (-not (Test-Path -LiteralPath $sourcePath -PathType Leaf)) {
        Add-ValidationError "Migration source is missing: $sourcePath"
    }
    else {
        $actualSourceHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $sourcePath).Hash
        if ($actualSourceHash -ne [string]$knowledge.source.sha256) {
            Add-ValidationError "Migration source hash is '$actualSourceHash'; expected '$($knowledge.source.sha256)'."
        }
    }

    foreach ($moduleRelativePath in Get-StringArray $knowledge.modulePaths) {
        $modulePath = Join-Path $RootPath $moduleRelativePath.Replace("/", "\")
        $module = Read-JsonFile $modulePath
        if (-not $module) { continue }
        $canonicalFiles.Add($modulePath)
        $moduleId = [string]$module.id
        if ([string]::IsNullOrWhiteSpace($moduleId)) {
            Add-ValidationError "Module '$modulePath' has no id."
            continue
        }
        if ($moduleById.ContainsKey($moduleId)) {
            Add-ValidationError "Duplicate module id '$moduleId'."
            continue
        }
        $moduleById[$moduleId] = $module
    }
}

if ($assetManifest) {
    foreach ($asset in @($assetManifest.assets)) {
        $assetId = [string]$asset.id
        if ([string]::IsNullOrWhiteSpace($assetId)) {
            Add-ValidationError "An asset has no id."
            continue
        }
        if ($assetById.ContainsKey($assetId)) {
            Add-ValidationError "Duplicate asset id '$assetId'."
            continue
        }
        $assetPath = [IO.Path]::GetFullPath((Join-Path $RootPath ([string]$asset.path).Replace("/", "\")))
        if (-not (Test-Path -LiteralPath $assetPath -PathType Leaf)) {
            Add-ValidationError "Asset '$assetId' is missing: $assetPath"
            continue
        }
        $actualAssetHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $assetPath).Hash
        if ($actualAssetHash -ne [string]$asset.sha256) {
            Add-ValidationError "Asset '$assetId' hash is '$actualAssetHash'; expected '$($asset.sha256)'."
        }
        if ([string]::IsNullOrWhiteSpace([string]$asset.altText)) {
            Add-ValidationError "Asset '$assetId' has no altText."
        }
        $assetById[$assetId] = $asset
        $assetByAbsolutePath[$assetPath] = $assetId
        $canonicalFiles.Add($assetPath)
    }
}

$allTopicFiles = @(Get-ChildItem -LiteralPath (Join-Path $RootPath "modules") -Recurse -Filter "topic.json" -File | Sort-Object FullName)
foreach ($topicFile in $allTopicFiles) {
    $topic = Read-JsonFile $topicFile.FullName
    if (-not $topic) { continue }
    $canonicalFiles.Add($topicFile.FullName)
    $topicId = [string]$topic.id
    if ([string]::IsNullOrWhiteSpace($topicId)) {
        Add-ValidationError "Topic '$($topicFile.FullName)' has no id."
        continue
    }
    if ($topicById.ContainsKey($topicId)) {
        Add-ValidationError "Duplicate topic id '$topicId'."
        continue
    }
    $topicById[$topicId] = $topic
    $topicSourceById[$topicId] = $topicFile.FullName
}

$allowedRouteKeys = if ($navigation) { Get-StringArray $navigation.allowedRouteKeys } else { @() }
$orderedTopicIds = New-Object Collections.Generic.List[string]
$orderedModuleIds = New-Object Collections.Generic.List[string]

if ($navigation) {
    foreach ($navigationModule in @($navigation.modules)) {
        $moduleId = [string]$navigationModule.moduleId
        if ($orderedModuleIds.Contains($moduleId)) { Add-ValidationError "navigation.json repeats module '$moduleId'."; continue }
        $orderedModuleIds.Add($moduleId)
        if (-not $moduleById.ContainsKey($moduleId)) { Add-ValidationError "navigation.json references unknown module '$moduleId'."; continue }
        $moduleTopicIds = Get-StringArray $moduleById[$moduleId].topicIds
        $navigationTopicIds = Get-StringArray $navigationModule.topicIds
        if (($moduleTopicIds -join "|") -ne ($navigationTopicIds -join "|")) {
            Add-ValidationError "Module '$moduleId' topic order differs between module.json and navigation.json."
        }
        foreach ($topicId in $navigationTopicIds) {
            if ($orderedTopicIds.Contains($topicId)) { Add-ValidationError "navigation.json repeats topic '$topicId'."; continue }
            $orderedTopicIds.Add($topicId)
        }
    }
}

foreach ($moduleId in $moduleById.Keys) {
    if (-not $orderedModuleIds.Contains($moduleId)) { Add-ValidationError "Module '$moduleId' is absent from navigation.json." }
}
foreach ($topicId in $topicById.Keys) {
    if (-not $orderedTopicIds.Contains($topicId)) { Add-ValidationError "Topic '$topicId' is absent from navigation.json." }
}
foreach ($topicId in $orderedTopicIds) {
    if (-not $topicById.ContainsKey($topicId)) { Add-ValidationError "navigation.json references unknown topic '$topicId'." }
}

foreach ($locale in $supportedLocales) {
    if (-not $localizedModuleByLocale.ContainsKey($locale) -or -not $localizedTopicByLocale.ContainsKey($locale)) {
        continue
    }

    $localizedModules = $localizedModuleByLocale[$locale]
    $localizedTopics = $localizedTopicByLocale[$locale]
    $localizedModuleIds = @($localizationByLocale[$locale].modules | ForEach-Object { [string]$_.id })
    $localizedTopicIds = @($localizationByLocale[$locale].topics | ForEach-Object { [string]$_.id })
    if (($localizedModuleIds -join "|") -ne (@($orderedModuleIds) -join "|")) {
        Add-ValidationError "Localization '$locale' module order differs from navigation.json."
    }
    if (($localizedTopicIds -join "|") -ne (@($orderedTopicIds) -join "|")) {
        Add-ValidationError "Localization '$locale' topic order differs from navigation.json."
    }
    foreach ($moduleId in $moduleById.Keys) {
        if (-not $localizedModules.ContainsKey($moduleId)) { Add-ValidationError "Localization '$locale' has no module '$moduleId'." }
    }
    foreach ($moduleId in $localizedModules.Keys) {
        if (-not $moduleById.ContainsKey($moduleId)) { Add-ValidationError "Localization '$locale' references unknown module '$moduleId'." }
    }
    foreach ($topicId in $topicById.Keys) {
        if (-not $localizedTopics.ContainsKey($topicId)) { Add-ValidationError "Localization '$locale' has no topic '$topicId'." }
    }
    foreach ($topicId in $localizedTopics.Keys) {
        if (-not $topicById.ContainsKey($topicId)) { Add-ValidationError "Localization '$locale' references unknown topic '$topicId'." }
    }
}

$bundleTopics = New-Object Collections.Generic.List[object]
foreach ($topicId in $orderedTopicIds) {
    if (-not $topicById.ContainsKey($topicId)) { continue }
    $topic = $topicById[$topicId]
    $topicPath = [string]$topicSourceById[$topicId]
    $contentPath = Join-Path (Split-Path -Parent $topicPath) "content.es-ES.md"
    if (-not (Test-Path -LiteralPath $contentPath -PathType Leaf)) {
        Add-ValidationError "Published topic '$topicId' is missing content.es-ES.md."
        continue
    }
    $canonicalFiles.Add($contentPath)
    $markdown = [IO.File]::ReadAllText($contentPath, $Utf8NoBom)
    $usefulText = (Get-ModelMarkdown $markdown).Trim()
    if ([string]$topic.status -eq "published" -and $usefulText.Length -lt 40) {
        Add-ValidationError "Published topic '$topicId' has no useful text chunk. Navigation-only headings must not be published topics."
    }
    $actualContentHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $contentPath).Hash
    if ($actualContentHash -ne [string]$topic.contentHash) {
        Add-ValidationError "Topic '$topicId' content hash is '$actualContentHash'; expected '$($topic.contentHash)'."
    }
    if (-not $moduleById.ContainsKey([string]$topic.moduleId)) { Add-ValidationError "Topic '$topicId' references unknown module '$($topic.moduleId)'." }
    $routeKey = if ($null -eq $topic.routeKey) { $null } else { [string]$topic.routeKey }
    if ($routeKey -and $allowedRouteKeys -notcontains $routeKey) { Add-ValidationError "Topic '$topicId' uses unknown routeKey '$routeKey'." }
    foreach ($locale in $supportedLocales) {
        if ($null -eq $topic.aliases.PSObject.Properties[$locale]) { Add-ValidationError "Topic '$topicId' has no aliases entry for locale '$locale'." }
        if ($null -eq $topic.sampleQuestions.PSObject.Properties[$locale]) { Add-ValidationError "Topic '$topicId' has no sampleQuestions entry for locale '$locale'." }
    }
    foreach ($referenceId in (Get-StringArray $topic.prerequisiteTopicIds) + (Get-StringArray $topic.relatedTopicIds)) {
        if ($referenceId -eq $topicId) { Add-ValidationError "Topic '$topicId' references itself."; continue }
        if (-not $topicById.ContainsKey($referenceId)) { Add-ValidationError "Topic '$topicId' references unknown topic '$referenceId'." }
    }
    foreach ($assetId in Get-StringArray $topic.assets) {
        if (-not $assetById.ContainsKey($assetId)) { Add-ValidationError "Topic '$topicId' references unknown asset '$assetId'." }
    }

    $chunks = @(New-TopicChunks -Topic $topic -Markdown $markdown -ContentPath $contentPath -AssetByAbsolutePath $assetByAbsolutePath)
    if ([string]$topic.status -eq "published" -and $chunks.Count -eq 0) { Add-ValidationError "Published topic '$topicId' generated no chunks." }
    $chunkIds = @($chunks | ForEach-Object { [string]$_.id })
    foreach ($quickAnswer in @($topic.quickAnswers)) {
        if ([string]::IsNullOrWhiteSpace([string]$quickAnswer.question) -or [string]::IsNullOrWhiteSpace([string]$quickAnswer.answer)) {
            Add-ValidationError "Topic '$topicId' contains an empty quick answer."
        }
        foreach ($chunkId in Get-StringArray $quickAnswer.sourceChunkIds) {
            if ($chunkIds -notcontains $chunkId) { Add-ValidationError "Quick answer '$($quickAnswer.id)' references unknown chunk '$chunkId'." }
        }
    }

    $topicLocalizations = [ordered]@{}
    foreach ($locale in $supportedLocales) {
        if (-not $localizedTopicByLocale.ContainsKey($locale) -or -not $localizedTopicByLocale[$locale].ContainsKey($topicId)) {
            continue
        }

        $localizedTopic = $localizedTopicByLocale[$locale][$topicId]
        $localizedTitle = [string]$localizedTopic.title
        $localizedSummary = [string]$localizedTopic.summary
        if ([string]::IsNullOrWhiteSpace($localizedTitle)) { Add-ValidationError "Topic '$topicId' has no title for locale '$locale'." }
        if ([string]::IsNullOrWhiteSpace($localizedSummary)) { Add-ValidationError "Topic '$topicId' has no short description for locale '$locale'." }
        if ($localizedSummary.Length -gt 120) { Add-ValidationError "Topic '$topicId' short description for locale '$locale' exceeds 120 characters." }
        if ($locale -eq [string]$knowledge.defaultLocale) {
            if ($localizedTitle -ne [string]$topic.title) { Add-ValidationError "Topic '$topicId' default-locale title differs from topic.json." }
        }

        $localizedContentPath = Join-Path (Split-Path -Parent $topicPath) "content.$locale.md"
        if (-not (Test-Path -LiteralPath $localizedContentPath -PathType Leaf)) {
            Add-ValidationError "Topic '$topicId' is missing content.$locale.md."
            continue
        }
        if ($localizedContentPath -ne $contentPath) { $canonicalFiles.Add($localizedContentPath) }
        $localizedMarkdown = [IO.File]::ReadAllText($localizedContentPath, $Utf8NoBom)
        $localizedHeadingMatch = [regex]::Match($localizedMarkdown, "(?m)^#\s+(?<title>.+?)\s*$")
        if (-not $localizedHeadingMatch.Success) {
            Add-ValidationError "Topic '$topicId' content for locale '$locale' has no level-one title."
        }
        elseif ($localizedHeadingMatch.Groups["title"].Value.Trim() -ne $localizedTitle) {
            Add-ValidationError "Topic '$topicId' level-one title differs from locale '$locale' metadata."
        }
        $localizedUsefulText = (Get-ModelMarkdown -Markdown $localizedMarkdown).Trim()
        $minimumUsefulCharacters = 40
        if ([string]$topic.status -eq "published" -and $localizedUsefulText.Length -lt $minimumUsefulCharacters) {
            Add-ValidationError "Published topic '$topicId' has no useful content for locale '$locale'."
        }

        $localizedTopicIdentity = [pscustomobject]@{ id = $topicId; title = $localizedTitle }
        $localizedChunks = @(New-TopicChunks -Topic $localizedTopicIdentity -Markdown $localizedMarkdown -ContentPath $localizedContentPath -AssetByAbsolutePath $assetByAbsolutePath)
        $localizedChunkIds = @($localizedChunks | ForEach-Object { [string]$_.id })
        if (($localizedChunkIds -join "|") -ne ($chunkIds -join "|")) {
            Add-ValidationError "Topic '$topicId' locale '$locale' generates different chunk ids from the source locale."
        }
        for ($chunkIndex = 0; $chunkIndex -lt [Math]::Min($chunks.Count, $localizedChunks.Count); $chunkIndex++) {
            $sourceImageRefs = @(Get-StringArray $chunks[$chunkIndex].imageRefs)
            $localizedImageRefs = @(Get-StringArray $localizedChunks[$chunkIndex].imageRefs)
            if (($sourceImageRefs -join "|") -ne ($localizedImageRefs -join "|")) {
                Add-ValidationError "Topic '$topicId' locale '$locale' does not preserve the source image references."
            }
        }

        $localizedQuickAnswerById = @{}
        foreach ($localizedQuickAnswer in @($localizedTopic.quickAnswers)) {
            $localizedQuickAnswerId = [string]$localizedQuickAnswer.id
            if ([string]::IsNullOrWhiteSpace($localizedQuickAnswerId)) { Add-ValidationError "Topic '$topicId' locale '$locale' has a quick answer without id."; continue }
            if ($localizedQuickAnswerById.ContainsKey($localizedQuickAnswerId)) { Add-ValidationError "Topic '$topicId' locale '$locale' repeats quick answer '$localizedQuickAnswerId'."; continue }
            $localizedQuickAnswerById[$localizedQuickAnswerId] = $localizedQuickAnswer
        }

        $localizedQuickAnswers = New-Object Collections.Generic.List[object]
        foreach ($quickAnswer in @($topic.quickAnswers)) {
            $quickAnswerId = [string]$quickAnswer.id
            if (-not $localizedQuickAnswerById.ContainsKey($quickAnswerId)) {
                Add-ValidationError "Topic '$topicId' locale '$locale' has no quick answer '$quickAnswerId'."
                continue
            }
            $localizedQuickAnswer = $localizedQuickAnswerById[$quickAnswerId]
            if ([string]::IsNullOrWhiteSpace([string]$localizedQuickAnswer.question) -or [string]::IsNullOrWhiteSpace([string]$localizedQuickAnswer.answer)) {
                Add-ValidationError "Quick answer '$quickAnswerId' is empty for locale '$locale'."
            }
            if ($locale -eq [string]$knowledge.defaultLocale -and
                ([string]$localizedQuickAnswer.question -ne [string]$quickAnswer.question -or
                 [string]$localizedQuickAnswer.answer -ne [string]$quickAnswer.answer)) {
                Add-ValidationError "Quick answer '$quickAnswerId' default-locale text differs from topic.json."
            }
            $localizedQuickAnswers.Add([ordered]@{
                id = $quickAnswerId
                question = [string]$localizedQuickAnswer.question
                answer = [string]$localizedQuickAnswer.answer
                sourceChunkIds = [string[]]@(Get-StringArray $quickAnswer.sourceChunkIds)
            })
        }
        foreach ($localizedQuickAnswerId in $localizedQuickAnswerById.Keys) {
            if (@($topic.quickAnswers | ForEach-Object { [string]$_.id }) -notcontains $localizedQuickAnswerId) {
                Add-ValidationError "Topic '$topicId' locale '$locale' references unknown quick answer '$localizedQuickAnswerId'."
            }
        }

        $topicLocalizations[$locale] = [ordered]@{
            title = $localizedTitle
            summary = $localizedSummary
            status = [string]$localizationByLocale[$locale].status
            contentHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $localizedContentPath).Hash
            quickAnswers = [object[]]@($localizedQuickAnswers | ForEach-Object { $_ })
            chunks = [object[]]@($localizedChunks)
        }
    }

    $bundleTopics.Add([ordered]@{
        id = $topicId
        moduleId = [string]$topic.moduleId
        sectionNumber = [string]$topic.sectionNumber
        title = [string]$topic.title
        summary = [string]$topic.summary
        aliases = $topic.aliases
        sampleQuestions = $topic.sampleQuestions
        audiences = [string[]]@(Get-StringArray $topic.audiences)
        prerequisiteTopicIds = [string[]]@(Get-StringArray $topic.prerequisiteTopicIds)
        relatedTopicIds = [string[]]@(Get-StringArray $topic.relatedTopicIds)
        routeKey = $routeKey
        status = [string]$topic.status
        contentVersion = [string]$topic.contentVersion
        contentHash = [string]$topic.contentHash
        translationCoverage = $topic.translationCoverage
        source = $topic.source
        quickAnswers = [object[]]@($topic.quickAnswers)
        chunks = [object[]]@($chunks)
        localizations = $topicLocalizations
    })
}

foreach ($asset in $assetById.Values) {
    foreach ($topicId in Get-StringArray $asset.usedByTopicIds) {
        if (-not $topicById.ContainsKey($topicId)) { Add-ValidationError "Asset '$($asset.id)' references unknown topic '$topicId'." }
    }
}

$evalFiles = @(
    (Join-Path $RootPath "evals\retrieval-cases.json"),
    (Join-Path $RootPath "evals\answer-cases.json")
)
$allChunkIds = @($bundleTopics | ForEach-Object { @($_.chunks) } | ForEach-Object { [string]$_.id })
foreach ($evalPath in $evalFiles) {
    $cases = Read-JsonFile $evalPath
    if (-not $cases) { continue }
    $canonicalFiles.Add($evalPath)
    $caseIds = New-Object Collections.Generic.List[string]
    $isAnswerEvaluation = (Split-Path -Leaf $evalPath) -eq "answer-cases.json"
    $answerLocales = New-Object Collections.Generic.List[string]
    foreach ($case in @($cases)) {
        if ([string]::IsNullOrWhiteSpace([string]$case.id)) { Add-ValidationError "An evaluation case in '$evalPath' has no id." }
        if ([string]::IsNullOrWhiteSpace([string]$case.question)) { Add-ValidationError "Evaluation case '$($case.id)' has no question." }
        $caseIds.Add([string]$case.id)
        if ($null -ne $case.PSObject.Properties["expectedTopicIds"]) {
            foreach ($expectedTopicId in Get-StringArray $case.expectedTopicIds) {
                if (-not $topicById.ContainsKey($expectedTopicId)) { Add-ValidationError "Evaluation case '$($case.id)' references unknown topic '$expectedTopicId'." }
            }
        }
        if ($null -ne $case.PSObject.Properties["expectedTopicId"] -and [string]$case.expectedTopicId -and -not $topicById.ContainsKey([string]$case.expectedTopicId)) {
            Add-ValidationError "Evaluation case '$($case.id)' references unknown topic '$($case.expectedTopicId)'."
        }
        if ($isAnswerEvaluation) {
            $locale = [string]$case.responseLocale
            if ($supportedLocales -notcontains $locale) { Add-ValidationError "Answer case '$($case.id)' uses unsupported locale '$locale'." }
            if (-not $answerLocales.Contains($locale)) { $answerLocales.Add($locale) }
            $resolution = [string]$case.expectedResolution
            if ($resolution -notin @("answered", "notDocumented")) { Add-ValidationError "Answer case '$($case.id)' has invalid expectedResolution '$resolution'." }
            $expectedIds = @(Get-StringArray $case.expectedTopicIds)
            $sourceIds = @(Get-StringArray $case.sourceChunkIds)
            $requiredSourceIds = @(Get-StringArray $case.requiredSourceChunkIds)
            foreach ($chunkId in @($sourceIds) + @($requiredSourceIds)) {
                if ($allChunkIds -notcontains $chunkId) { Add-ValidationError "Answer case '$($case.id)' references unknown chunk '$chunkId'." }
            }
            if (@(Get-StringArray $case.requiredFacts).Count -eq 0) { Add-ValidationError "Answer case '$($case.id)' has no requiredFacts." }
            if (@(Get-StringArray $case.forbiddenClaims).Count -eq 0) { Add-ValidationError "Answer case '$($case.id)' has no forbiddenClaims." }
            if ($resolution -eq "answered" -and ($expectedIds.Count -eq 0 -or $sourceIds.Count -eq 0)) { Add-ValidationError "Answered case '$($case.id)' must reference a topic and source chunk." }
            if ($resolution -eq "notDocumented" -and ($expectedIds.Count -gt 0 -or $sourceIds.Count -gt 0)) { Add-ValidationError "notDocumented case '$($case.id)' must not reference topics or source chunks." }
        }
    }
    foreach ($duplicate in @($caseIds | Group-Object | Where-Object Count -gt 1)) {
        Add-ValidationError "Evaluation file '$evalPath' repeats case id '$($duplicate.Name)'."
    }
    if ($isAnswerEvaluation) {
        foreach ($locale in $supportedLocales) {
            if (-not $answerLocales.Contains($locale)) { Add-ValidationError "Answer evaluations have no case for locale '$locale'." }
        }
    }
}

$knowledgeHash = if ($canonicalFiles.Count -gt 0) { Get-CanonicalHash -Root $RootPath -Files @($canonicalFiles | ForEach-Object { $_ }) } else { $null }
$bundleModules = @($orderedModuleIds | ForEach-Object {
    if (-not $moduleById.ContainsKey($_)) { return }
    $module = $moduleById[$_]
    $moduleLocalizations = [ordered]@{}
    foreach ($locale in $supportedLocales) {
        if (-not $localizedModuleByLocale.ContainsKey($locale) -or -not $localizedModuleByLocale[$locale].ContainsKey([string]$module.id)) {
            continue
        }
        $localizedModule = $localizedModuleByLocale[$locale][[string]$module.id]
        if ([string]::IsNullOrWhiteSpace([string]$localizedModule.title)) { Add-ValidationError "Module '$($module.id)' has no title for locale '$locale'." }
        if ([string]::IsNullOrWhiteSpace([string]$localizedModule.description)) { Add-ValidationError "Module '$($module.id)' has no description for locale '$locale'." }
        if ($locale -eq [string]$knowledge.defaultLocale) {
            if ([string]$localizedModule.title -ne [string]$module.title) { Add-ValidationError "Module '$($module.id)' default-locale title differs from module.json." }
            if ([string]$localizedModule.description -ne [string]$module.description) { Add-ValidationError "Module '$($module.id)' default-locale description differs from module.json." }
        }
        $moduleLocalizations[$locale] = [ordered]@{
            title = [string]$localizedModule.title
            description = [string]$localizedModule.description
        }
    }
    [ordered]@{
        id = [string]$module.id
        title = [string]$module.title
        description = [string]$module.description
        order = [int]$module.order
        aliases = $module.aliases
        topicIds = [string[]]@(Get-StringArray $module.topicIds)
        localizations = $moduleLocalizations
    }
})
$bundleAssets = @($assetById.Values | Sort-Object { [string]$_.id } | ForEach-Object {
    [ordered]@{
        id = [string]$_.id
        path = [string]$_.path
        mimeType = [string]$_.mimeType
        sha256 = [string]$_.sha256
        altText = [string]$_.altText
        sourcePart = [string]$_.sourcePart
    }
})

$titleLocalizations = [ordered]@{}
foreach ($locale in $supportedLocales) {
    if ($localizationByLocale.ContainsKey($locale)) {
        $titleLocalizations[$locale] = [string]$localizationByLocale[$locale].title
    }
}

$bundle = if ($knowledge) {
    [ordered]@{
        schemaVersion = "1.1"
        knowledgeVersion = [string]$knowledge.knowledgeVersion
        knowledgeHash = $knowledgeHash
        title = [string]$knowledge.title
        titleLocalizations = $titleLocalizations
        defaultLocale = [string]$knowledge.defaultLocale
        supportedResponseLocales = [string[]]$supportedLocales
        source = $knowledge.source
        allowedRouteKeys = [string[]]$allowedRouteKeys
        modules = [object[]]$bundleModules
        topics = [object[]]@($bundleTopics | ForEach-Object { $_ })
        assets = [object[]]$bundleAssets
    }
} else { $null }

$bundleHash = $null
if ($ValidationErrors.Count -eq 0 -and -not $ValidateOnly) {
    Write-JsonFile -Path $OutputPath -Value $bundle
    $bundleHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $OutputPath).Hash
}

$report = [ordered]@{
    schemaVersion = "1.1"
    valid = ($ValidationErrors.Count -eq 0)
    errors = @($ValidationErrors | ForEach-Object { $_ })
    warnings = @($ValidationWarnings | ForEach-Object { $_ })
    counts = [ordered]@{
        modules = $moduleById.Count
        topics = $topicById.Count
        publishedTopics = @($topicById.Values | Where-Object { [string]$_.status -eq "published" }).Count
        chunks = @($bundleTopics | ForEach-Object { @($_.chunks).Count } | Measure-Object -Sum).Sum
        quickAnswers = @($topicById.Values | ForEach-Object { @($_.quickAnswers).Count } | Measure-Object -Sum).Sum
        assets = $assetById.Count
        locales = $localizationByLocale.Count
        localizedTopics = @($bundleTopics | ForEach-Object { $_.localizations.Keys.Count } | Measure-Object -Sum).Sum
        localizedChunks = @($bundleTopics | ForEach-Object { $_.localizations.Values | ForEach-Object { @($_.chunks).Count } } | Measure-Object -Sum).Sum
    }
    knowledgeHash = $knowledgeHash
    bundleSha256 = $bundleHash
}
Write-JsonFile -Path $ReportPath -Value $report

if ($ValidationErrors.Count -gt 0) {
    throw "CRM help validation failed with $($ValidationErrors.Count) error(s). See '$ReportPath'."
}

$report | ConvertTo-Json -Depth 20
