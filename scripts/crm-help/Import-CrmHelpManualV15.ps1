[CmdletBinding()]
param(
    [string]$SourcePath,
    [string]$OutputRoot,
    [switch]$Force
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$ExpectedSourceSha256 = "60B4E58876173D8A1173FDF04670E500F1A77BB4D66BCFD58768F4D750976AB9"
$KnowledgeVersion = "1.5.0"
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

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

    $json = $Value | ConvertTo-Json -Depth 30
    Write-Utf8File -Path $Path -Content ($json + "`n")
}

function Normalize-Text {
    param([AllowEmptyString()][string]$Text)

    if ([string]::IsNullOrWhiteSpace($Text)) {
        return ""
    }

    $value = $Text.Replace([char]0x00A0, " ")
    return ([regex]::Replace($value, "\s+", " ")).Trim()
}

function ConvertTo-Slug {
    param([Parameter(Mandatory = $true)][string]$Text)

    $normalized = $Text.Normalize([Text.NormalizationForm]::FormD)
    $builder = New-Object Text.StringBuilder
    foreach ($character in $normalized.ToCharArray()) {
        $category = [Globalization.CharUnicodeInfo]::GetUnicodeCategory($character)
        if ($category -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
            [void]$builder.Append($character)
        }
    }

    $slug = $builder.ToString().Normalize([Text.NormalizationForm]::FormC).ToLowerInvariant()
    $slug = [regex]::Replace($slug, "[^a-z0-9]+", "-").Trim("-")
    if (-not $slug) {
        throw "Could not build a stable slug for '$Text'."
    }

    return $slug
}

function Get-ModuleId {
    param([Parameter(Mandatory = $true)][string]$SectionNumber)

    $major = $SectionNumber.Split(".")[0]
    switch ($major) {
        { $_ -in @("1", "2", "3") } { return "introduction" }
        "4" { return "access" }
        { $_ -in @("5", "6") } { return "common-ui" }
        "7" { return "visits" }
        "8" { return "expenses" }
        "9" { return "tickets" }
        "10" { return "expense-approval" }
        "11" { return "axapta" }
        "12" { return "troubleshooting" }
        "13" { return "glossary" }
        default { throw "Section '$SectionNumber' does not have a module mapping." }
    }
}

function Get-RouteKey {
    param([Parameter(Mandatory = $true)][string]$SectionNumber)

    $major = $SectionNumber.Split(".")[0]
    switch ($major) {
        "7" { return "visits.history" }
        { $_ -in @("8", "10") } { return "expenses.sheets" }
        "9" { return "expenses.tickets" }
        default { return $null }
    }
}

function Convert-ParagraphToMarkdown {
    param(
        [Parameter(Mandatory = $true)]$Paragraph,
        [Parameter(Mandatory = $true)][string]$TopicTitle
    )

    $text = Normalize-Text $Paragraph.Text
    if (-not $text) {
        return ""
    }

    if ($text -match "^(IMPORTANTE|RECOMENDACIÓN|SEGURIDAD|REVISIÓN OBLIGATORIA|ACCIÓN DESHABILITADA|BLOQUEO CONTABLE):\s*(?<body>.*)$") {
        return "> **$($Matches[1]):** $($Matches.body)"
    }

    if ($text -match "^[•▪]\s*(?<body>.*)$") {
        return "- $($Matches.body)"
    }

    if ($Paragraph.IsTableCell -or $Paragraph.Style -eq "Prrafodelista") {
        return "- $text"
    }

    return $text
}

function Get-ImageAltText {
    param(
        [Parameter(Mandatory = $true)][string]$TopicTitle,
        [AllowEmptyString()][string]$Context
    )

    $safeContext = Normalize-Text $Context
    if ($safeContext.Length -gt 160) {
        $safeContext = $safeContext.Substring(0, 157).TrimEnd() + "..."
    }

    if ($safeContext) {
        return "Captura de «$TopicTitle» relacionada con: $safeContext"
    }

    return "Captura de la sección «$TopicTitle» del manual CRM."
}

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
if (-not $SourcePath) {
    $SourcePath = Join-Path $repoRoot "docs\exports\Manual App CRM 1.5.docx"
}
if (-not $OutputRoot) {
    $OutputRoot = Join-Path $repoRoot "docs\crm-help"
}

$source = (Resolve-Path -LiteralPath $SourcePath).Path
$sourceHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $source).Hash
if ($sourceHash -ne $ExpectedSourceSha256) {
    throw "The source DOCX hash is '$sourceHash'; expected '$ExpectedSourceSha256'. Refusing to migrate an unknown document."
}

if ((Test-Path -LiteralPath $OutputRoot) -and -not $Force) {
    $existing = @(Get-ChildItem -LiteralPath $OutputRoot -Force -ErrorAction SilentlyContinue)
    if ($existing.Count -gt 0) {
        throw "Output root '$OutputRoot' is not empty. Use -Force only for the controlled 1.5 migration."
    }
}

$moduleDefinitions = @(
    [ordered]@{ id = "introduction"; title = "Primeros pasos"; description = "Objetivo, alcance, conceptos básicos y uso seguro del CRM."; aliases = [ordered]@{ "es-ES" = @("primeros pasos", "manual CRM") } },
    [ordered]@{ id = "access"; title = "Acceso al CRM"; description = "Apertura, identificación, favoritos y cierre de sesión."; aliases = [ordered]@{ "es-ES" = @("acceso al CRM", "iniciar sesión") } },
    [ordered]@{ id = "common-ui"; title = "Pantalla, empresa y permisos"; description = "Controles comunes, empresa activa, idioma y permisos."; aliases = [ordered]@{ "es-ES" = @("pantalla", "empresa activa", "permisos") } },
    [ordered]@{ id = "visits"; title = "Visitas"; description = "Consulta, creación, edición y eliminación de visitas."; aliases = [ordered]@{ "es-ES" = @("visitas", "historial de visitas") } },
    [ordered]@{ id = "expenses"; title = "Hojas de gastos"; description = "Creación y mantenimiento de hojas y líneas de gasto."; aliases = [ordered]@{ "es-ES" = @("hojas de gastos", "gastos") } },
    [ordered]@{ id = "tickets"; title = "Tickets"; description = "Consulta, creación y estado de justificantes de gasto."; aliases = [ordered]@{ "es-ES" = @("tickets", "justificantes") } },
    [ordered]@{ id = "expense-approval"; title = "Aprobación de gastos"; description = "Estados, responsables y acciones de aprobación."; aliases = [ordered]@{ "es-ES" = @("aprobación de gastos", "estados de hoja") } },
    [ordered]@{ id = "axapta"; title = "Continuidad en Axapta"; description = "Relación y continuidad del flujo de gastos en Axapta."; aliases = [ordered]@{ "es-ES" = @("Axapta", "gastos en Axapta") } },
    [ordered]@{ id = "troubleshooting"; title = "Problemas frecuentes"; description = "Comprobaciones y datos que deben enviarse a soporte."; aliases = [ordered]@{ "es-ES" = @("problemas frecuentes", "soporte") } },
    [ordered]@{ id = "glossary"; title = "Glosario"; description = "Definiciones básicas utilizadas en el manual."; aliases = [ordered]@{ "es-ES" = @("glosario", "definiciones") } }
)

$quickQuestions = @{
    "4.4" = "¿Cómo cierro la sesión del CRM?"
    "6.2" = "¿Cómo cambio el idioma del CRM?"
    "9.3" = "¿Qué significan los estados Pendiente y Asignado de un ticket?"
    "12.1" = "¿Qué hago si la página del CRM no abre?"
    "12.2" = "¿Qué hago si la identificación se repite?"
    "12.3" = "¿Por qué no aparece un menú, botón o usuario?"
    "12.4" = "¿Qué debo revisar si no puedo guardar?"
    "12.5" = "¿Qué hago si la imagen del ticket no se procesa?"
    "12.6" = "¿Qué información debo enviar a soporte?"
}

$visualDescriptions = @{
    "10.1" = @(
        "Las transiciones disponibles dependen de la configuración, el perfil y la acción.",
        "Desde Borrador, Solicitar aprobación lleva a Aprobación solicitada; cuando no se requiere aprobación, Aprobar lleva a Aprobada.",
        "Desde Aprobación solicitada, Deshacer solicitud devuelve a Borrador, Aprobar lleva a Aprobada y Rechazar lleva a Rechazada.",
        "Desde Aprobada, Deshacer aprobación devuelve a Aprobación solicitada y Contabilizar en Axapta lleva a Pagada.",
        "Desde Rechazada, Pasar a Borrador devuelve a Borrador y Deshacer rechazo devuelve a Aprobación solicitada."
    )
}

$tempRoot = Join-Path ([IO.Path]::GetTempPath()) ("crm-help-manual-v15-" + [Guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $tempRoot | Out-Null

try {
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [IO.Compression.ZipFile]::ExtractToDirectory($source, $tempRoot)

    [xml]$document = [IO.File]::ReadAllText((Join-Path $tempRoot "word\document.xml"), $Utf8NoBom)
    [xml]$relationships = [IO.File]::ReadAllText((Join-Path $tempRoot "word\_rels\document.xml.rels"), $Utf8NoBom)

    $namespace = New-Object Xml.XmlNamespaceManager($document.NameTable)
    $namespace.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
    $namespace.AddNamespace("a", "http://schemas.openxmlformats.org/drawingml/2006/main")
    $namespace.AddNamespace("r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships")
    $namespace.AddNamespace("v", "urn:schemas-microsoft-com:vml")
    $namespace.AddNamespace("wp", "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing")

    $relationshipMap = @{}
    foreach ($relationship in $relationships.Relationships.Relationship) {
        $relationshipMap[$relationship.Id] = [string]$relationship.Target
    }

    $paragraphs = @()
    $paragraphIndex = 0
    foreach ($paragraph in $document.SelectNodes("//w:body//w:p", $namespace)) {
        $paragraphIndex++
        $styleNode = $paragraph.SelectSingleNode("w:pPr/w:pStyle", $namespace)
        $style = if ($null -ne $styleNode) { $styleNode.GetAttribute("val", "http://schemas.openxmlformats.org/wordprocessingml/2006/main") } else { "" }
        $text = Normalize-Text (($paragraph.SelectNodes(".//w:t", $namespace) | ForEach-Object { $_.InnerText }) -join "")
        $imageRelationshipIds = @()
        foreach ($image in $paragraph.SelectNodes(".//a:blip", $namespace)) {
            $id = $image.GetAttribute("embed", "http://schemas.openxmlformats.org/officeDocument/2006/relationships")
            if ($id) { $imageRelationshipIds += $id }
        }
        foreach ($image in $paragraph.SelectNodes(".//v:imagedata", $namespace)) {
            $id = $image.GetAttribute("id", "http://schemas.openxmlformats.org/officeDocument/2006/relationships")
            if ($id) { $imageRelationshipIds += $id }
        }

        $paragraphs += [pscustomobject][ordered]@{
            Index = $paragraphIndex
            Style = $style
            Text = $text
            IsTableCell = ($null -ne $paragraph.SelectSingleNode("ancestor::w:tc", $namespace))
            ImageRelationshipIds = @($imageRelationshipIds | Select-Object -Unique)
        }
    }

    $headings = @()
    foreach ($paragraph in $paragraphs | Where-Object { $_.Style -in @("TDC1", "TDC2", "TDC3") }) {
        if ($paragraph.Text -match "^(?<number>\d+(?:\.\d+)*\.)\s*(?<title>.*?)(?<page>\d+)$") {
            $sectionNumber = $Matches.number.TrimEnd(".")
            $title = Normalize-Text $Matches.title
            $fullHeading = "$($Matches.number) $title"
            $headings += [pscustomobject][ordered]@{
                Number = $sectionNumber
                Title = $title
                FullHeading = $fullHeading
                TocIndex = $paragraph.Index
                Page = [int]$Matches.page
            }
        }
    }

    if ($headings.Count -ne 65) {
        throw "Expected 65 logical sections in the table of contents, found $($headings.Count)."
    }

    foreach ($heading in $headings) {
        $matches = @($paragraphs | Where-Object { $_.Index -gt 100 -and $_.Text -eq $heading.FullHeading })
        if ($matches.Count -ne 1) {
            throw "Section '$($heading.FullHeading)' matched $($matches.Count) body headings; expected exactly one."
        }
        Add-Member -InputObject $heading -NotePropertyName BodyIndex -NotePropertyValue $matches[0].Index
    }

    $topicCandidates = @()
    for ($headingIndex = 0; $headingIndex -lt $headings.Count; $headingIndex++) {
        $heading = $headings[$headingIndex]
        $nextBodyIndex = if ($headingIndex -lt ($headings.Count - 1)) { $headings[$headingIndex + 1].BodyIndex } else { [int]::MaxValue }
        $sectionParagraphs = @($paragraphs | Where-Object { $_.Index -gt $heading.BodyIndex -and $_.Index -lt $nextBodyIndex })
        $hasUsefulContent = @($sectionParagraphs | Where-Object { $_.Text -or $_.ImageRelationshipIds.Count -gt 0 }).Count -gt 0
        if (-not $hasUsefulContent) {
            continue
        }

        $moduleId = Get-ModuleId $heading.Number
        $slug = ConvertTo-Slug $heading.Title
        $topicId = "$moduleId.$slug"
        $topicCandidates += [pscustomobject][ordered]@{
            Number = $heading.Number
            Title = $heading.Title
            FullHeading = $heading.FullHeading
            Page = $heading.Page
            ModuleId = $moduleId
            Slug = $slug
            Id = $topicId
            Paragraphs = $sectionParagraphs
        }
    }

    $duplicateTopicIds = @($topicCandidates | Group-Object Id | Where-Object Count -gt 1)
    if ($duplicateTopicIds.Count -gt 0) {
        throw "Duplicate topic IDs: $($duplicateTopicIds.Name -join ', ')."
    }

    $assetsRoot = Join-Path $OutputRoot "assets\manual-1.5"
    New-Item -ItemType Directory -Path $assetsRoot -Force | Out-Null
    $mediaRoot = Join-Path $tempRoot "word\media"
    $mediaFiles = @(Get-ChildItem -LiteralPath $mediaRoot -File | Sort-Object @{ Expression = { if ($_.BaseName -match "(\d+)$") { [int]$Matches[1] } else { [int]::MaxValue } } }, Name)
    if ($mediaFiles.Count -ne 54) {
        throw "Expected 54 media files, found $($mediaFiles.Count)."
    }

    $assetByTarget = @{}
    $assetRecords = @()
    foreach ($media in $mediaFiles) {
        $destination = Join-Path $assetsRoot $media.Name
        Copy-Item -LiteralPath $media.FullName -Destination $destination -Force
        $assetId = "manual-1.5.$($media.BaseName.ToLowerInvariant())"
        $mimeType = switch ($media.Extension.ToLowerInvariant()) {
            ".png" { "image/png" }
            ".jpg" { "image/jpeg" }
            ".jpeg" { "image/jpeg" }
            default { "application/octet-stream" }
        }
        $record = [ordered]@{
            id = $assetId
            path = "assets/manual-1.5/$($media.Name)"
            mimeType = $mimeType
            sha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $destination).Hash
            sourcePart = "word/media/$($media.Name)"
            altText = "Imagen procedente del Manual App CRM 1.5; consulte el tema asociado para su contexto funcional."
            usedByTopicIds = @()
        }
        $assetRecords += $record
        $assetByTarget[("media/" + $media.Name).ToLowerInvariant()] = $record
    }

    $publishedTopics = @()
    foreach ($candidate in $topicCandidates) {
        $markdownLines = New-Object Collections.Generic.List[string]
        $markdownLines.Add("# $($candidate.Title)")
        $markdownLines.Add("")
        $markdownLines.Add("<!-- Fuente: Manual App CRM 1.5.docx, sección $($candidate.Number). -->")
        $markdownLines.Add("")

        $lastContext = ""
        $plainParagraphs = New-Object Collections.Generic.List[string]
        if ($visualDescriptions.ContainsKey($candidate.Number)) {
            $markdownLines.Add("**Transiciones disponibles:**")
            $markdownLines.Add("")
            foreach ($descriptionLine in $visualDescriptions[$candidate.Number]) {
                $markdownLines.Add("- $descriptionLine")
                $plainParagraphs.Add($descriptionLine)
                $lastContext = $descriptionLine
            }
            $markdownLines.Add("")
        }
        foreach ($paragraph in $candidate.Paragraphs) {
            $markdownText = Convert-ParagraphToMarkdown -Paragraph $paragraph -TopicTitle $candidate.Title
            if ($markdownText) {
                $markdownLines.Add($markdownText)
                $markdownLines.Add("")
                $lastContext = $paragraph.Text
                $plainParagraphs.Add($paragraph.Text)
            }

            foreach ($relationshipId in $paragraph.ImageRelationshipIds) {
                if (-not $relationshipMap.ContainsKey($relationshipId)) {
                    throw "Image relationship '$relationshipId' is missing from document relationships."
                }
                $target = ([string]$relationshipMap[$relationshipId]).Replace("\", "/").TrimStart("/").ToLowerInvariant()
                if (-not $assetByTarget.ContainsKey($target)) {
                    throw "Image relationship '$relationshipId' targets '$target', which is not in the asset manifest."
                }
                # Keep imported images historical; published topics do not surface or associate them.
            }
        }

        $content = (($markdownLines -join "`n").TrimEnd() + "`n")
        $summarySource = @($plainParagraphs | Where-Object { $_ -and $_ -notmatch "^(IMPORTANTE|RECOMENDACIÓN|SEGURIDAD|REVISIÓN OBLIGATORIA|ACCIÓN DESHABILITADA|BLOQUEO CONTABLE):" } | Select-Object -First 1)
        $summary = if ($summarySource.Count -gt 0) { Normalize-Text $summarySource[0] } else { "La sección contiene una referencia visual del manual sobre $($candidate.Title)." }
        if ($summary.Length -gt 280) {
            $summary = $summary.Substring(0, 277).TrimEnd() + "..."
        }

        $module = $moduleDefinitions | Where-Object { $_.id -eq $candidate.ModuleId } | Select-Object -First 1
        $spanishAliases = @($candidate.Title)
        if ($candidate.Title -match "^Módulo\s+(?<short>.+)$") {
            $spanishAliases += $Matches.short
        }
        $spanishAliases += @($module.aliases["es-ES"])
        $aliases = [ordered]@{
            "es-ES" = @($spanishAliases | Where-Object { $_ } | Select-Object -Unique)
        }
        $sampleQuestions = [ordered]@{
            "es-ES" = @("¿Dónde encuentro información sobre $($candidate.Title.ToLowerInvariant())?")
        }

        $quickAnswers = @()
        if ($quickQuestions.ContainsKey($candidate.Number)) {
            $answerParts = New-Object Collections.Generic.List[string]
            $answerLength = 0
            foreach ($part in $plainParagraphs) {
                $cleanPart = Normalize-Text ($part -replace "^[•▪]\s*", "")
                if (-not $cleanPart) { continue }
                if (($answerLength + $cleanPart.Length) -gt 900 -and $answerParts.Count -gt 0) { break }
                $answerParts.Add($cleanPart)
                $answerLength += $cleanPart.Length
            }
            $quickAnswers = @([ordered]@{
                id = "$($candidate.Id).quick-01"
                question = [string]$quickQuestions[$candidate.Number]
                answer = ($answerParts -join " ").Trim()
                sourceChunkIds = @("$($candidate.Id)--01")
            })
        }

        $topicFolder = Join-Path $OutputRoot "modules\$($candidate.ModuleId)\topics\$($candidate.Slug)"
        $contentPath = Join-Path $topicFolder "content.es-ES.md"
        Write-Utf8File -Path $contentPath -Content $content
        $contentHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $contentPath).Hash

        $topicMetadata = [ordered]@{
            schemaVersion = "1.0"
            id = $candidate.Id
            moduleId = $candidate.ModuleId
            sectionNumber = $candidate.Number
            title = $candidate.Title
            summary = $summary
            aliases = $aliases
            sampleQuestions = $sampleQuestions
            audiences = @("authenticated-crm-user")
            prerequisiteTopicIds = @()
            relatedTopicIds = @()
            routeKey = Get-RouteKey $candidate.Number
            status = "published"
            contentVersion = $KnowledgeVersion
            contentHash = $contentHash
            assets = @()
            quickAnswers = $quickAnswers
            translationCoverage = [ordered]@{ "es-ES" = "source" }
            source = [ordered]@{ path = "docs/exports/Manual App CRM 1.5.docx"; sha256 = $sourceHash; sectionNumber = $candidate.Number; pageFromTableOfContents = $candidate.Page }
        }
        Write-JsonFile -Path (Join-Path $topicFolder "topic.json") -Value $topicMetadata

        $publishedTopics += [pscustomobject][ordered]@{
            Candidate = $candidate
            Metadata = $topicMetadata
            TopicFolder = $topicFolder
        }
    }

    $publishedIds = @($publishedTopics | ForEach-Object { $_.Metadata.id })
    foreach ($published in $publishedTopics) {
        $number = [string]$published.Metadata.sectionNumber
        $relatedIds = New-Object Collections.Generic.List[string]
        if ($number.Contains(".")) {
            $parentNumber = $number.Substring(0, $number.LastIndexOf("."))
            $parent = $publishedTopics | Where-Object { $_.Metadata.sectionNumber -eq $parentNumber } | Select-Object -First 1
            if ($parent) { $relatedIds.Add($parent.Metadata.id) }
        }
        $prefix = "$number."
        foreach ($child in $publishedTopics | Where-Object {
            $childNumber = [string]$_.Metadata.sectionNumber
            $childNumber.StartsWith($prefix) -and ($childNumber.Substring($prefix.Length) -notmatch "\.")
        }) {
            if (-not $relatedIds.Contains($child.Metadata.id)) { $relatedIds.Add($child.Metadata.id) }
        }
        $published.Metadata.relatedTopicIds = @($relatedIds)
        Write-JsonFile -Path (Join-Path $published.TopicFolder "topic.json") -Value $published.Metadata
    }

    foreach ($moduleIndex in 0..($moduleDefinitions.Count - 1)) {
        $module = $moduleDefinitions[$moduleIndex]
        $topicIds = @($publishedTopics | Where-Object { $_.Metadata.moduleId -eq $module.id } | ForEach-Object { $_.Metadata.id })
        $moduleFile = [ordered]@{
            schemaVersion = "1.0"
            id = $module.id
            title = $module.title
            description = $module.description
            order = $moduleIndex + 1
            aliases = $module.aliases
            topicIds = $topicIds
        }
        Write-JsonFile -Path (Join-Path $OutputRoot "modules\$($module.id)\module.json") -Value $moduleFile
    }

    Write-JsonFile -Path (Join-Path $assetsRoot "assets.json") -Value ([ordered]@{
        schemaVersion = "1.0"
        sourceSha256 = $sourceHash
        assets = $assetRecords
    })

    $navigation = [ordered]@{
        schemaVersion = "1.0"
        allowedRouteKeys = @("home", "visits.history", "expenses.sheets", "expenses.tickets")
        modules = @($moduleDefinitions | ForEach-Object {
            $moduleId = $_.id
            [ordered]@{
                moduleId = $moduleId
                topicIds = @($publishedTopics | Where-Object { $_.Metadata.moduleId -eq $moduleId } | ForEach-Object { $_.Metadata.id })
            }
        })
    }
    Write-JsonFile -Path (Join-Path $OutputRoot "navigation.json") -Value $navigation

    $knowledge = [ordered]@{
        schemaVersion = "1.0"
        knowledgeVersion = $KnowledgeVersion
        title = "Ayuda de la aplicación CRM"
        defaultLocale = "es-ES"
        supportedResponseLocales = @("es-ES")
        source = [ordered]@{
            path = "docs/exports/Manual App CRM 1.5.docx"
            sha256 = $sourceHash
            role = "migration-input"
        }
        modulePaths = @($moduleDefinitions | ForEach-Object { "modules/$($_.id)/module.json" })
        assetManifestPath = "assets/manual-1.5/assets.json"
        navigationPath = "navigation.json"
    }
    Write-JsonFile -Path (Join-Path $OutputRoot "knowledge.json") -Value $knowledge

    $retrievalCases = New-Object Collections.Generic.List[object]
    $caseNumber = 0
    foreach ($published in $publishedTopics) {
        $caseNumber++
        $retrievalCases.Add([ordered]@{
            id = "route-{0:D3}-es" -f $caseNumber
            question = [string]$published.Metadata.sampleQuestions["es-ES"][0]
            responseLocale = "es-ES"
            selectedTopicId = $null
            expectedResolution = "answered"
            expectedTopicIds = @($published.Metadata.id)
        })
    }
    $retrievalCases.Add([ordered]@{ id = "route-ambiguous-expenses"; question = "Necesito ayuda con gastos"; responseLocale = "es-ES"; selectedTopicId = $null; expectedResolution = "needsSelection"; expectedTopicIds = @($publishedTopics | Where-Object { $_.Metadata.moduleId -in @("expenses", "tickets", "expense-approval") } | Select-Object -First 5 | ForEach-Object { $_.Metadata.id }) })
    $retrievalCases.Add([ordered]@{ id = "route-out-of-scope-password"; question = "¿Cuál es mi contraseña corporativa?"; responseLocale = "es-ES"; selectedTopicId = $null; expectedResolution = "notDocumented"; expectedTopicIds = @() })
    $retrievalCases.Add([ordered]@{ id = "route-out-of-scope-customer-delete"; question = "Elimina definitivamente un cliente por mí"; responseLocale = "es-ES"; selectedTopicId = $null; expectedResolution = "notDocumented"; expectedTopicIds = @() })
    $extraCasesPath = Join-Path $PSScriptRoot "resources\retrieval-cases.extra.json"
    $extraCases = [IO.File]::ReadAllText($extraCasesPath, $Utf8NoBom) | ConvertFrom-Json
    foreach ($extraCase in @($extraCases)) {
        foreach ($expectedTopicId in @($extraCase.expectedTopicIds)) {
            if ($publishedIds -notcontains [string]$expectedTopicId) {
                throw "Extra retrieval case '$($extraCase.id)' references unknown topic '$expectedTopicId'."
            }
        }
        $retrievalCases.Add($extraCase)
    }
    $caseIds = @($retrievalCases | ForEach-Object {
        if ($_ -is [Collections.IDictionary]) { [string]$_["id"] } else { [string]$_.id }
    })
    $duplicateCaseIds = @($caseIds | Group-Object | Where-Object Count -gt 1)
    if ($duplicateCaseIds.Count -gt 0) {
        throw "Duplicate retrieval case IDs: $($duplicateCaseIds.Name -join ', ')."
    }
    Write-JsonFile -Path (Join-Path $OutputRoot "evals\retrieval-cases.json") -Value @($retrievalCases | ForEach-Object { $_ })

    $answerCasesPath = Join-Path $PSScriptRoot "resources\answer-cases.json"
    $answerCases = [IO.File]::ReadAllText($answerCasesPath, $Utf8NoBom) | ConvertFrom-Json
    $supportedLocales = @("es-ES")
    $duplicateAnswerCaseIds = @($answerCases | Group-Object id | Where-Object Count -gt 1)
    if ($duplicateAnswerCaseIds.Count -gt 0) {
        throw "Duplicate answer case IDs: $($duplicateAnswerCaseIds.Name -join ', ')."
    }
    foreach ($answerCase in @($answerCases)) {
        if ($supportedLocales -notcontains [string]$answerCase.responseLocale) {
            throw "Answer case '$($answerCase.id)' uses unsupported locale '$($answerCase.responseLocale)'."
        }
        if ([string]$answerCase.expectedResolution -notin @("answered", "notDocumented")) {
            throw "Answer case '$($answerCase.id)' has invalid expectedResolution '$($answerCase.expectedResolution)'."
        }
        foreach ($expectedTopicId in @($answerCase.expectedTopicIds)) {
            if ($publishedIds -notcontains [string]$expectedTopicId) {
                throw "Answer case '$($answerCase.id)' references unknown topic '$expectedTopicId'."
            }
        }
        foreach ($sourceChunkId in @($answerCase.sourceChunkIds) + @($answerCase.requiredSourceChunkIds)) {
            $knownPrefix = @($answerCase.expectedTopicIds | Where-Object { $sourceChunkId -match ('^' + [regex]::Escape([string]$_) + '--\d{2}$') }).Count -gt 0
            if (-not $knownPrefix) {
                throw "Answer case '$($answerCase.id)' references chunk '$sourceChunkId' outside its expected topics."
            }
        }
        if (@($answerCase.requiredFacts).Count -eq 0 -or @($answerCase.forbiddenClaims).Count -eq 0) {
            throw "Answer case '$($answerCase.id)' must declare requiredFacts and forbiddenClaims."
        }
        if ([string]$answerCase.expectedResolution -eq "answered" -and (@($answerCase.expectedTopicIds).Count -eq 0 -or @($answerCase.sourceChunkIds).Count -eq 0)) {
            throw "Answered case '$($answerCase.id)' must reference at least one topic and source chunk."
        }
        if ([string]$answerCase.expectedResolution -eq "notDocumented" -and (@($answerCase.expectedTopicIds).Count -gt 0 -or @($answerCase.sourceChunkIds).Count -gt 0)) {
            throw "notDocumented case '$($answerCase.id)' must not reference topics or source chunks."
        }
    }
    Write-JsonFile -Path (Join-Path $OutputRoot "evals\answer-cases.json") -Value $answerCases

    [pscustomobject][ordered]@{
        sourceSha256 = $sourceHash
        logicalSections = $headings.Count
        publishedTopics = $publishedTopics.Count
        navigationOnlySections = $headings.Count - $publishedTopics.Count
        assetsCopiedWithoutTransformation = $assetRecords.Count
        outputRoot = (Resolve-Path -LiteralPath $OutputRoot).Path
    } | ConvertTo-Json -Depth 5
}
finally {
    $resolvedTemp = [IO.Path]::GetFullPath($tempRoot)
    $systemTemp = [IO.Path]::GetFullPath([IO.Path]::GetTempPath())
    if ($resolvedTemp.StartsWith($systemTemp, [StringComparison]::OrdinalIgnoreCase) -and (Test-Path -LiteralPath $resolvedTemp)) {
        Remove-Item -LiteralPath $resolvedTemp -Recurse -Force
    }
}
