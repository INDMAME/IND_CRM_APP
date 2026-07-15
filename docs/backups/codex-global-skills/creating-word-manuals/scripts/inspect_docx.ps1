<#
.SYNOPSIS
Inspects a Word Open XML package without modifying it.

.DESCRIPTION
Returns a JSON inventory by default, or an object with -AsObject. When
-ReportPath is supplied, the same JSON is written atomically as UTF-8 without
a BOM. Existing reports are preserved unless -ForceReport is supplied.

.NOTES
Exit code 0 means valid. Exit code 2 means the input or report is invalid.
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Path,

    [switch]$AsObject,

    [switch]$Compact,

    [string]$ReportPath,

    [switch]$ForceReport,

    [ValidateRange(4, 100)]
    [int]$JsonDepth = 16
)

Set-StrictMode -Version 2.0
$ErrorActionPreference = "Stop"

# Computes a lowercase SHA-256 hash for a byte array.
function Get-Sha256FromBytes {
    param([byte[]]$Bytes)

    $sha = New-Object System.Security.Cryptography.SHA256Managed
    try {
        $hash = $sha.ComputeHash($Bytes)
        return (($hash | ForEach-Object { $_.ToString("x2") }) -join "")
    }
    finally {
        $sha.Dispose()
    }
}

# Reads a ZIP archive entry into a byte array.
function Get-EntryBytes {
    param([System.IO.Compression.ZipArchiveEntry]$Entry)

    $stream = $Entry.Open()
    $memory = New-Object System.IO.MemoryStream
    try {
        $stream.CopyTo($memory)
        return $memory.ToArray()
    }
    finally {
        $memory.Dispose()
        $stream.Dispose()
    }
}

# Parses package XML bytes with external entity resolution disabled.
function Get-XmlFromBytes {
    param(
        [byte[]]$Bytes,
        [string]$PartName
    )

    $xml = New-Object System.Xml.XmlDocument
    $xml.PreserveWhitespace = $true
    try {
        $memory = New-Object System.IO.MemoryStream(,$Bytes)
        try {
            $settings = New-Object System.Xml.XmlReaderSettings
            $settings.DtdProcessing = [System.Xml.DtdProcessing]::Prohibit
            $settings.XmlResolver = $null
            $reader = [System.Xml.XmlReader]::Create($memory, $settings)
            try {
                $xml.Load($reader)
            }
            finally {
                $reader.Dispose()
            }
        }
        finally {
            $memory.Dispose()
        }
    }
    catch {
        throw "Invalid XML in package part '$PartName': $($_.Exception.Message)"
    }
    return $xml
}

# Creates a namespace manager for Word document XML.
function New-WordNamespaceManager {
    param([System.Xml.XmlDocument]$Xml)

    $ns = New-Object System.Xml.XmlNamespaceManager($Xml.NameTable)
    $ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
    $ns.AddNamespace("r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships")
    $ns.AddNamespace("wp", "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing")
    $ns.AddNamespace("a", "http://schemas.openxmlformats.org/drawingml/2006/main")
    $ns.AddNamespace("v", "urn:schemas-microsoft-com:vml")
    return ,$ns
}

# Normalizes an Open XML package part path.
function Normalize-PartPath {
    param([string]$PartPath)

    $segments = New-Object System.Collections.Generic.List[string]
    foreach ($segment in ($PartPath -replace "\\", "/").Split("/")) {
        if ([string]::IsNullOrEmpty($segment) -or $segment -eq ".") {
            continue
        }
        if ($segment -eq "..") {
            if ($segments.Count -eq 0) {
                return $null
            }
            $segments.RemoveAt($segments.Count - 1)
            continue
        }
        $segments.Add($segment)
    }
    return ($segments -join "/")
}

# Maps a relationship part path to its source part.
function Get-RelationshipSourcePart {
    param([string]$RelationshipPart)

    if ($RelationshipPart -eq "_rels/.rels") {
        return ""
    }
    $match = [regex]::Match($RelationshipPart, "^(.*)/_rels/([^/]+)\.rels$")
    if (-not $match.Success) {
        return $null
    }
    $directory = $match.Groups[1].Value
    $fileName = $match.Groups[2].Value
    if ([string]::IsNullOrEmpty($directory)) {
        return $fileName
    }
    return "$directory/$fileName"
}

# Resolves a relationship target against its source part.
function Resolve-RelationshipTarget {
    param(
        [string]$SourcePart,
        [string]$Target,
        [string]$TargetMode
    )

    if ($TargetMode -eq "External") {
        return $Target
    }
    if ($Target.StartsWith("/")) {
        return Normalize-PartPath -PartPath $Target.TrimStart("/")
    }
    $lastSlash = $SourcePart.LastIndexOf("/")
    $directory = if ($lastSlash -ge 0) { $SourcePart.Substring(0, $lastSlash) } else { "" }
    $combined = if ([string]::IsNullOrEmpty($directory)) { $Target } else { "$directory/$Target" }
    return Normalize-PartPath -PartPath $combined
}

# Collapses whitespace in text used for semantic comparisons.
function Get-NormalizedText {
    param([string]$Value)

    if ($null -eq $Value) {
        return ""
    }
    return ([regex]::Replace($Value, "\s+", " ")).Trim()
}

# Extracts text and supported control characters from a paragraph.
function Get-ParagraphText {
    param(
        [System.Xml.XmlNode]$Paragraph,
        [System.Xml.XmlNamespaceManager]$NamespaceManager
    )

    $builder = New-Object System.Text.StringBuilder
    $nodes = $Paragraph.SelectNodes(".//w:t | .//w:tab | .//w:br | .//w:cr | .//w:noBreakHyphen | .//w:softHyphen | .//w:sym", $NamespaceManager)
    foreach ($node in $nodes) {
        switch ($node.LocalName) {
            "t" { [void]$builder.Append($node.InnerText) }
            "tab" { [void]$builder.Append("`t") }
            "br" { [void]$builder.Append("`n") }
            "cr" { [void]$builder.Append("`n") }
            "noBreakHyphen" { [void]$builder.Append([char]0x2011) }
            "softHyphen" { [void]$builder.Append([char]0x00AD) }
            "sym" {
                $charValue = $node.GetAttribute("char", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
                [void]$builder.Append("[SYM:$charValue]")
            }
        }
    }
    return $builder.ToString()
}

# Builds semantic tokens for a Word story XML document.
function Get-StorySemanticTokens {
    param(
        [System.Xml.XmlDocument]$Xml,
        [System.Xml.XmlNamespaceManager]$NamespaceManager
    )

    $tokens = New-Object System.Collections.Generic.List[string]
    $interesting = $Xml.SelectNodes("//w:p | //w:tbl | //w:tr | //w:tc | //w:t | //w:tab | //w:br | //w:cr | //w:noBreakHyphen | //w:softHyphen | //w:sym | //w:fldSimple | //w:fldChar | //w:instrText | //w:hyperlink | //w:bookmarkStart | //wp:inline | //wp:anchor", $NamespaceManager)
    foreach ($node in $interesting) {
        switch ($node.LocalName) {
            "p" { $tokens.Add("P") }
            "tbl" { $tokens.Add("TABLE") }
            "tr" { $tokens.Add("ROW") }
            "tc" { $tokens.Add("CELL") }
            "t" { $tokens.Add("TEXT|" + $node.InnerText) }
            "tab" { $tokens.Add("TAB") }
            "br" {
                $type = $node.GetAttribute("type", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
                $tokens.Add("BREAK|" + $type)
            }
            "cr" { $tokens.Add("CR") }
            "noBreakHyphen" { $tokens.Add("NO_BREAK_HYPHEN") }
            "softHyphen" { $tokens.Add("SOFT_HYPHEN") }
            "sym" {
                $font = $node.GetAttribute("font", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
                $charValue = $node.GetAttribute("char", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
                $tokens.Add("SYMBOL|$font|$charValue")
            }
            "fldSimple" {
                $instruction = $node.GetAttribute("instr", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
                $tokens.Add("FIELD_SIMPLE|" + (Get-NormalizedText -Value $instruction))
            }
            "fldChar" {
                $type = $node.GetAttribute("fldCharType", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
                $tokens.Add("FIELD_CHAR|" + $type)
            }
            "instrText" { $tokens.Add("FIELD_INSTR|" + (Get-NormalizedText -Value $node.InnerText)) }
            "hyperlink" {
                $anchor = $node.GetAttribute("anchor", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
                $relId = $node.GetAttribute("id", "http://schemas.openxmlformats.org/officeDocument/2006/relationships")
                $tokens.Add("HYPERLINK|$relId|$anchor")
            }
            "bookmarkStart" {
                $name = $node.GetAttribute("name", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
                $tokens.Add("BOOKMARK|" + $name)
            }
            "inline" { $tokens.Add("DRAWING|inline") }
            "anchor" { $tokens.Add("DRAWING|anchor") }
        }
    }
    return ,$tokens.ToArray()
}

# Converts XML node attributes into an ordered object.
function Convert-AttributesToObject {
    param([System.Xml.XmlNode]$Node)

    $attributes = [ordered]@{}
    if ($null -ne $Node -and $null -ne $Node.Attributes) {
        foreach ($attribute in $Node.Attributes) {
            $attributes[$attribute.LocalName] = $attribute.Value
        }
    }
    return [pscustomobject]$attributes
}

# Identifies package parts that contain Word story content.
function Test-IsStoryPart {
    param([string]$Name)

    return (
        $Name -eq "word/document.xml" -or
        $Name -match "^word/header[0-9]+\.xml$" -or
        $Name -match "^word/footer[0-9]+\.xml$" -or
        $Name -eq "word/footnotes.xml" -or
        $Name -eq "word/endnotes.xml" -or
        $Name -eq "word/comments.xml" -or
        $Name -eq "word/glossary/document.xml"
    )
}

# Serializes the result, optionally writes a report, and exits.
function Write-ResultAndExit {
    param(
        [object]$Result,
        [int]$ExitCode
    )

    $jsonParameters = @{ InputObject = $Result; Depth = $JsonDepth }
    if ($Compact) {
        $jsonParameters["Compress"] = $true
    }
    $json = ConvertTo-Json @jsonParameters

    if ($script:ReportWritable -and -not [string]::IsNullOrEmpty($script:ResolvedReportPath)) {
        $temporaryReportPath = Join-Path ([System.IO.Path]::GetDirectoryName($script:ResolvedReportPath)) ("." + [System.IO.Path]::GetFileName($script:ResolvedReportPath) + "." + [guid]::NewGuid().ToString("N") + ".tmp")
        try {
            $utf8WithoutBom = New-Object System.Text.UTF8Encoding($false)
            [System.IO.File]::WriteAllText($temporaryReportPath, $json, $utf8WithoutBom)
            Move-Item -LiteralPath $temporaryReportPath -Destination $script:ResolvedReportPath -Force:$ForceReport
        }
        catch {
            if (Test-Path -LiteralPath $temporaryReportPath -PathType Leaf) {
                Remove-Item -LiteralPath $temporaryReportPath -Force -ErrorAction SilentlyContinue
            }
            $ExitCode = 2
            if ($Result.PSObject.Properties.Name -contains "IsValid") {
                $Result.IsValid = $false
            }
            $existingErrors = if ($Result.PSObject.Properties.Name -contains "Errors") { @($Result.Errors) } else { @() }
            $Result | Add-Member -NotePropertyName Errors -NotePropertyValue @($existingErrors + "Could not write report '$($script:ResolvedReportPath)': $($_.Exception.Message)") -Force
            $jsonParameters["InputObject"] = $Result
            $json = ConvertTo-Json @jsonParameters
        }
    }

    if ($AsObject) {
        Write-Output $Result
    }
    else {
        Write-Output $json
    }
    exit $ExitCode
}

$resolvedPath = $null
$zip = $null
$fileStream = $null
$script:ResolvedReportPath = $null
$script:ReportWritable = $false

try {
    $item = Get-Item -LiteralPath $Path -ErrorAction Stop
    if ($item.PSIsContainer) {
        throw "The path is a directory, not a DOCX file."
    }
    $resolvedPath = $item.FullName
    if ($item.Extension -notin @(".docx", ".docm", ".dotx", ".dotm")) {
        throw "The file extension is not a supported Word package extension."
    }
    if (-not [string]::IsNullOrWhiteSpace($ReportPath)) {
        $script:ResolvedReportPath = [System.IO.Path]::GetFullPath($ReportPath)
        if ($script:ResolvedReportPath -ieq $resolvedPath) {
            throw "ReportPath must not point to the input Word file."
        }
        $reportDirectory = [System.IO.Path]::GetDirectoryName($script:ResolvedReportPath)
        if ([string]::IsNullOrEmpty($reportDirectory)) {
            throw "ReportPath does not have a valid parent directory."
        }
        if (-not (Test-Path -LiteralPath $reportDirectory -PathType Container)) {
            [void][System.IO.Directory]::CreateDirectory($reportDirectory)
        }
        if ((Test-Path -LiteralPath $script:ResolvedReportPath) -and -not $ForceReport) {
            throw "ReportPath already exists. Use -ForceReport to replace it."
        }
        $script:ReportWritable = $true
    }

    Add-Type -AssemblyName System.IO.Compression
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $fileHashBefore = (Get-FileHash -LiteralPath $resolvedPath -Algorithm SHA256).Hash.ToLowerInvariant()
    $fileStream = [System.IO.File]::Open($resolvedPath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::Read)
    $zip = New-Object System.IO.Compression.ZipArchive($fileStream, [System.IO.Compression.ZipArchiveMode]::Read, $false)

    $errors = New-Object System.Collections.Generic.List[string]
    $warnings = New-Object System.Collections.Generic.List[string]
    $entryGroups = $zip.Entries | Group-Object -Property FullName
    $duplicates = @($entryGroups | Where-Object { $_.Count -gt 1 } | ForEach-Object { $_.Name })
    if ($duplicates.Count -gt 0) {
        $errors.Add("Duplicate package part names were found: " + ($duplicates -join ", "))
    }

    $entryMap = @{}
    foreach ($entry in $zip.Entries) {
        if (-not [string]::IsNullOrEmpty($entry.FullName) -and -not $entry.FullName.EndsWith("/")) {
            if (-not $entryMap.ContainsKey($entry.FullName)) {
                $entryMap[$entry.FullName] = $entry
            }
        }
    }
    foreach ($entryName in @($entryMap.Keys)) {
        $normalizedEntryName = Normalize-PartPath -PartPath $entryName
        if ($entryName.Contains("\") -or $entryName.StartsWith("/") -or $null -eq $normalizedEntryName -or $normalizedEntryName -cne $entryName) {
            $errors.Add("Unsafe or non-canonical package part name: $entryName")
        }
    }
    foreach ($requiredPart in @("[Content_Types].xml", "_rels/.rels", "word/document.xml")) {
        if (-not $entryMap.ContainsKey($requiredPart)) {
            $errors.Add("Required package part is missing: $requiredPart")
        }
    }
    if ($errors.Count -gt 0) {
        throw ($errors -join "; ")
    }

    $partInventory = New-Object System.Collections.Generic.List[object]
    $partHashes = @{}
    foreach ($entryName in @($entryMap.Keys | Sort-Object)) {
        $entry = $entryMap[$entryName]
        $bytes = Get-EntryBytes -Entry $entry
        $hash = Get-Sha256FromBytes -Bytes $bytes
        $partHashes[$entryName] = $hash
        $partInventory.Add([pscustomobject][ordered]@{
            Name = $entryName
            Length = [long]$entry.Length
            CompressedLength = [long]$entry.CompressedLength
            Sha256 = $hash
        })
    }

    $xmlPartCount = 0
    foreach ($xmlPartName in @($entryMap.Keys | Where-Object { $_ -match "\.(xml|rels)$" } | Sort-Object)) {
        [void](Get-XmlFromBytes -Bytes (Get-EntryBytes -Entry $entryMap[$xmlPartName]) -PartName $xmlPartName)
        $xmlPartCount++
    }

    $contentTypesXml = Get-XmlFromBytes -Bytes (Get-EntryBytes -Entry $entryMap["[Content_Types].xml"]) -PartName "[Content_Types].xml"
    if ($null -eq $contentTypesXml.DocumentElement -or $contentTypesXml.DocumentElement.LocalName -ne "Types") {
        throw "The content types package part does not have a valid Types root element."
    }
    $contentTypeMap = @{}
    $defaultTypes = @{}
    foreach ($node in $contentTypesXml.DocumentElement.ChildNodes) {
        if ($node.LocalName -eq "Override") {
            $contentTypeMap[$node.GetAttribute("PartName").TrimStart("/")] = $node.GetAttribute("ContentType")
        }
        elseif ($node.LocalName -eq "Default") {
            $defaultTypes[$node.GetAttribute("Extension").ToLowerInvariant()] = $node.GetAttribute("ContentType")
        }
    }

    $relationships = New-Object System.Collections.Generic.List[object]
    $relationshipLookup = @{}
    $danglingRelationships = New-Object System.Collections.Generic.List[object]
    foreach ($relsName in @($entryMap.Keys | Where-Object { $_ -match "\.rels$" } | Sort-Object)) {
        $sourcePart = Get-RelationshipSourcePart -RelationshipPart $relsName
        if ($null -eq $sourcePart) {
            $warnings.Add("Unrecognized relationship part path: $relsName")
            continue
        }
        $relsXml = Get-XmlFromBytes -Bytes (Get-EntryBytes -Entry $entryMap[$relsName]) -PartName $relsName
        foreach ($relNode in $relsXml.DocumentElement.ChildNodes) {
            if ($relNode.LocalName -ne "Relationship") {
                continue
            }
            $id = $relNode.GetAttribute("Id")
            $type = $relNode.GetAttribute("Type")
            $target = $relNode.GetAttribute("Target")
            $targetMode = $relNode.GetAttribute("TargetMode")
            $resolvedTarget = Resolve-RelationshipTarget -SourcePart $sourcePart -Target $target -TargetMode $targetMode
            $exists = if ($targetMode -eq "External") { $null } else { $null -ne $resolvedTarget -and $entryMap.ContainsKey($resolvedTarget) }
            $relObject = [pscustomobject][ordered]@{
                RelationshipPart = $relsName
                SourcePart = $sourcePart
                Id = $id
                Type = $type
                Target = $target
                TargetMode = $targetMode
                ResolvedTarget = $resolvedTarget
                TargetExists = $exists
            }
            $relationships.Add($relObject)
            $relationshipKey = "$sourcePart|$id"
            if ($relationshipLookup.ContainsKey($relationshipKey)) {
                $errors.Add("Duplicate relationship id '$id' for source part '$sourcePart'.")
            }
            else {
                $relationshipLookup[$relationshipKey] = $relObject
            }
            if ($targetMode -ne "External" -and -not $exists) {
                $danglingRelationships.Add($relObject)
            }
        }
    }
    if ($danglingRelationships.Count -gt 0) {
        $errors.Add("One or more internal relationships target missing package parts.")
    }
    $relationshipLines = @($relationships | Sort-Object RelationshipPart, Id | ForEach-Object {
        "$($_.RelationshipPart)|$($_.SourcePart)|$($_.Id)|$($_.Type)|$($_.Target)|$($_.TargetMode)|$($_.ResolvedTarget)"
    })
    $relationshipHash = Get-Sha256FromBytes -Bytes ([System.Text.Encoding]::UTF8.GetBytes(($relationshipLines -join "`n")))

    $storyParts = @($entryMap.Keys | Where-Object { Test-IsStoryPart -Name $_ } | Sort-Object @{ Expression = { if ($_ -eq "word/document.xml") { 0 } else { 1 } } }, @{ Expression = { $_ } })
    $stories = New-Object System.Collections.Generic.List[object]
    $allImages = New-Object System.Collections.Generic.List[object]
    $allHyperlinks = New-Object System.Collections.Generic.List[object]
    $allBookmarks = New-Object System.Collections.Generic.List[object]
    $allContentControls = New-Object System.Collections.Generic.List[object]
    $totalCounts = [ordered]@{
        Paragraphs = 0
        Runs = 0
        Tables = 0
        Rows = 0
        Cells = 0
        Drawings = 0
        InlineDrawings = 0
        AnchoredDrawings = 0
        LegacyVmlImages = 0
        Hyperlinks = 0
        Bookmarks = 0
        Breaks = 0
        LastRenderedPageBreaks = 0
        ContentControls = 0
        Fields = 0
    }

    foreach ($storyPart in $storyParts) {
        $storyXml = Get-XmlFromBytes -Bytes (Get-EntryBytes -Entry $entryMap[$storyPart]) -PartName $storyPart
        $ns = New-WordNamespaceManager -Xml $storyXml
        $paragraphNodes = @($storyXml.SelectNodes("//w:p", $ns))
        $paragraphTexts = @($paragraphNodes | ForEach-Object { Get-ParagraphText -Paragraph $_ -NamespaceManager $ns })
        $storyText = $paragraphTexts -join "`n"
        $semanticTokens = Get-StorySemanticTokens -Xml $storyXml -NamespaceManager $ns
        $semanticHash = Get-Sha256FromBytes -Bytes ([System.Text.Encoding]::UTF8.GetBytes(($semanticTokens -join "`n")))
        $textHash = Get-Sha256FromBytes -Bytes ([System.Text.Encoding]::UTF8.GetBytes($storyText))

        $runCount = @($storyXml.SelectNodes("//w:r", $ns)).Count
        $tableCount = @($storyXml.SelectNodes("//w:tbl", $ns)).Count
        $rowCount = @($storyXml.SelectNodes("//w:tr", $ns)).Count
        $cellCount = @($storyXml.SelectNodes("//w:tc", $ns)).Count
        $inlineNodes = @($storyXml.SelectNodes("//wp:inline", $ns))
        $anchorNodes = @($storyXml.SelectNodes("//wp:anchor", $ns))
        $vmlImageNodes = @($storyXml.SelectNodes("//v:imagedata", $ns))
        $hyperlinkNodes = @($storyXml.SelectNodes("//w:hyperlink", $ns))
        $bookmarkNodes = @($storyXml.SelectNodes("//w:bookmarkStart", $ns))
        $breakNodes = @($storyXml.SelectNodes("//w:br", $ns))
        $lastRenderedBreaks = @($storyXml.SelectNodes("//w:lastRenderedPageBreak", $ns)).Count
        $contentControlNodes = @($storyXml.SelectNodes("//w:sdt", $ns))
        $simpleFieldNodes = @($storyXml.SelectNodes("//w:fldSimple", $ns))
        $fieldBeginNodes = @($storyXml.SelectNodes("//w:fldChar[@w:fldCharType='begin']", $ns))
        $fieldInstructions = New-Object System.Collections.Generic.List[object]
        foreach ($fieldNode in $simpleFieldNodes) {
            $fieldInstructions.Add([pscustomobject][ordered]@{
                Kind = "Simple"
                Instruction = Get-NormalizedText -Value $fieldNode.GetAttribute("instr", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
            })
        }
        foreach ($instructionNode in @($storyXml.SelectNodes("//w:instrText", $ns))) {
            $fieldInstructions.Add([pscustomobject][ordered]@{
                Kind = "ComplexInstructionFragment"
                Instruction = Get-NormalizedText -Value $instructionNode.InnerText
            })
        }

        $breakSummary = [ordered]@{ Default = 0; Page = 0; Column = 0; TextWrapping = 0; Other = 0 }
        foreach ($breakNode in $breakNodes) {
            $breakType = $breakNode.GetAttribute("type", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
            switch ($breakType) {
                "" { $breakSummary.Default++ }
                "page" { $breakSummary.Page++ }
                "column" { $breakSummary.Column++ }
                "textWrapping" { $breakSummary.TextWrapping++ }
                default { $breakSummary.Other++ }
            }
        }

        foreach ($drawingNode in @($inlineNodes + $anchorNodes)) {
            $docPr = $drawingNode.SelectSingleNode("./wp:docPr", $ns)
            $extent = $drawingNode.SelectSingleNode("./wp:extent", $ns)
            $blip = $drawingNode.SelectSingleNode(".//a:blip", $ns)
            $relId = if ($null -ne $blip) { $blip.GetAttribute("embed", "http://schemas.openxmlformats.org/officeDocument/2006/relationships") } else { "" }
            if ([string]::IsNullOrEmpty($relId) -and $null -ne $blip) {
                $relId = $blip.GetAttribute("link", "http://schemas.openxmlformats.org/officeDocument/2006/relationships")
            }
            if ($null -eq $blip) {
                continue
            }
            $relationshipKey = "$storyPart|$relId"
            $resolved = if ($relationshipLookup.ContainsKey($relationshipKey)) { $relationshipLookup[$relationshipKey] } else { $null }
            $allImages.Add([pscustomobject][ordered]@{
                StoryPart = $storyPart
                Placement = $drawingNode.LocalName
                RelationshipId = $relId
                Target = if ($null -ne $resolved) { $resolved.ResolvedTarget } else { $null }
                TargetExists = if ($null -ne $resolved) { $resolved.TargetExists } else { $false }
                IsExternal = if ($null -ne $resolved) { $resolved.TargetMode -eq "External" } else { $false }
                Name = if ($null -ne $docPr) { $docPr.GetAttribute("name") } else { $null }
                Title = if ($null -ne $docPr) { $docPr.GetAttribute("title") } else { $null }
                Description = if ($null -ne $docPr) { $docPr.GetAttribute("descr") } else { $null }
                WidthEmu = if ($null -ne $extent) { $extent.GetAttribute("cx") } else { $null }
                HeightEmu = if ($null -ne $extent) { $extent.GetAttribute("cy") } else { $null }
            })
        }
        foreach ($vmlNode in $vmlImageNodes) {
            $relId = $vmlNode.GetAttribute("id", "http://schemas.openxmlformats.org/officeDocument/2006/relationships")
            $relationshipKey = "$storyPart|$relId"
            $resolved = if ($relationshipLookup.ContainsKey($relationshipKey)) { $relationshipLookup[$relationshipKey] } else { $null }
            $allImages.Add([pscustomobject][ordered]@{
                StoryPart = $storyPart
                Placement = "vml"
                RelationshipId = $relId
                Target = if ($null -ne $resolved) { $resolved.ResolvedTarget } else { $null }
                TargetExists = if ($null -ne $resolved) { $resolved.TargetExists } else { $false }
                IsExternal = if ($null -ne $resolved) { $resolved.TargetMode -eq "External" } else { $false }
                Name = $null
                Title = $vmlNode.GetAttribute("title")
                Description = $null
                WidthEmu = $null
                HeightEmu = $null
            })
        }
        foreach ($hyperlinkNode in $hyperlinkNodes) {
            $relId = $hyperlinkNode.GetAttribute("id", "http://schemas.openxmlformats.org/officeDocument/2006/relationships")
            $anchor = $hyperlinkNode.GetAttribute("anchor", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
            $relationshipKey = "$storyPart|$relId"
            $resolved = if (-not [string]::IsNullOrEmpty($relId) -and $relationshipLookup.ContainsKey($relationshipKey)) { $relationshipLookup[$relationshipKey] } else { $null }
            $allHyperlinks.Add([pscustomobject][ordered]@{
                StoryPart = $storyPart
                RelationshipId = $relId
                Anchor = $anchor
                Target = if ($null -ne $resolved) { $resolved.ResolvedTarget } else { $null }
                Text = Get-ParagraphText -Paragraph $hyperlinkNode -NamespaceManager $ns
            })
        }
        foreach ($bookmarkNode in $bookmarkNodes) {
            $allBookmarks.Add([pscustomobject][ordered]@{
                StoryPart = $storyPart
                Id = $bookmarkNode.GetAttribute("id", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
                Name = $bookmarkNode.GetAttribute("name", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
            })
        }
        foreach ($sdtNode in $contentControlNodes) {
            $properties = $sdtNode.SelectSingleNode("./w:sdtPr", $ns)
            $aliasNode = if ($null -ne $properties) { $properties.SelectSingleNode("./w:alias", $ns) } else { $null }
            $tagNode = if ($null -ne $properties) { $properties.SelectSingleNode("./w:tag", $ns) } else { $null }
            $idNode = if ($null -ne $properties) { $properties.SelectSingleNode("./w:id", $ns) } else { $null }
            $lockNode = if ($null -ne $properties) { $properties.SelectSingleNode("./w:lock", $ns) } else { $null }
            $allContentControls.Add([pscustomobject][ordered]@{
                StoryPart = $storyPart
                Id = if ($null -ne $idNode) { $idNode.GetAttribute("val", "http://schemas.openxmlformats.org/wordprocessingml/2006/main") } else { $null }
                Alias = if ($null -ne $aliasNode) { $aliasNode.GetAttribute("val", "http://schemas.openxmlformats.org/wordprocessingml/2006/main") } else { $null }
                Tag = if ($null -ne $tagNode) { $tagNode.GetAttribute("val", "http://schemas.openxmlformats.org/wordprocessingml/2006/main") } else { $null }
                Lock = if ($null -ne $lockNode) { $lockNode.GetAttribute("val", "http://schemas.openxmlformats.org/wordprocessingml/2006/main") } else { $null }
            })
        }

        $storyCounts = [ordered]@{
            Paragraphs = $paragraphNodes.Count
            Runs = $runCount
            Tables = $tableCount
            Rows = $rowCount
            Cells = $cellCount
            Drawings = $inlineNodes.Count + $anchorNodes.Count
            InlineDrawings = $inlineNodes.Count
            AnchoredDrawings = $anchorNodes.Count
            LegacyVmlImages = $vmlImageNodes.Count
            Hyperlinks = $hyperlinkNodes.Count
            Bookmarks = $bookmarkNodes.Count
            Breaks = $breakNodes.Count
            LastRenderedPageBreaks = $lastRenderedBreaks
            ContentControls = $contentControlNodes.Count
            Fields = $simpleFieldNodes.Count + $fieldBeginNodes.Count
        }
        foreach ($key in @($storyCounts.Keys)) {
            $totalCounts[$key] += $storyCounts[$key]
        }

        $stories.Add([pscustomobject][ordered]@{
            Part = $storyPart
            Counts = [pscustomobject]$storyCounts
            BreakTypes = [pscustomobject]$breakSummary
            Text = $storyText
            TextLength = $storyText.Length
            TextSha256 = $textHash
            SemanticTokenCount = $semanticTokens.Count
            SemanticTokenSha256 = $semanticHash
            FieldInstructions = $fieldInstructions.ToArray()
        })
    }

    $mediaParts = New-Object System.Collections.Generic.List[object]
    foreach ($mediaName in @($entryMap.Keys | Where-Object { $_ -match "^word/media/" } | Sort-Object)) {
        $extension = [System.IO.Path]::GetExtension($mediaName).TrimStart(".").ToLowerInvariant()
        $contentType = if ($contentTypeMap.ContainsKey($mediaName)) { $contentTypeMap[$mediaName] } elseif ($defaultTypes.ContainsKey($extension)) { $defaultTypes[$extension] } else { $null }
        $mediaParts.Add([pscustomobject][ordered]@{
            Part = $mediaName
            ContentType = $contentType
            Length = [long]$entryMap[$mediaName].Length
            Sha256 = $partHashes[$mediaName]
        })
    }

    $settingsProtection = $null
    if ($entryMap.ContainsKey("word/settings.xml")) {
        $settingsXml = Get-XmlFromBytes -Bytes (Get-EntryBytes -Entry $entryMap["word/settings.xml"]) -PartName "word/settings.xml"
        $settingsNs = New-WordNamespaceManager -Xml $settingsXml
        $protectionNode = $settingsXml.SelectSingleNode("/w:settings/w:documentProtection", $settingsNs)
        if ($null -ne $protectionNode) {
            $settingsProtection = Convert-AttributesToObject -Node $protectionNode
        }
    }

    $signatureParts = @($entryMap.Keys | Where-Object { $_ -match "^_xmlsignatures/" } | Sort-Object)
    $macroParts = @($entryMap.Keys | Where-Object {
        $_ -match "(^|/)vbaProject\.bin$" -or $_ -match "(^|/)vbaData\.xml$" -or $_ -match "^word/activeX/"
    } | Sort-Object)
    $macroContentType = @($contentTypeMap.Values | Where-Object { $_ -match "macroEnabled" }).Count -gt 0

    $trackedChangeTypes = @(
        "ins", "del", "moveFrom", "moveTo", "moveFromRangeStart", "moveFromRangeEnd",
        "moveToRangeStart", "moveToRangeEnd", "pPrChange", "rPrChange", "tblPrChange",
        "trPrChange", "tcPrChange", "sectPrChange", "numberingChange"
    )
    $trackedChanges = [ordered]@{}
    foreach ($type in $trackedChangeTypes) {
        $trackedChanges[$type] = 0
    }
    foreach ($storyPart in $storyParts) {
        $storyXml = Get-XmlFromBytes -Bytes (Get-EntryBytes -Entry $entryMap[$storyPart]) -PartName $storyPart
        $ns = New-WordNamespaceManager -Xml $storyXml
        foreach ($type in $trackedChangeTypes) {
            $trackedChanges[$type] += @($storyXml.SelectNodes("//w:$type", $ns)).Count
        }
    }
    $trackedTotal = 0
    foreach ($value in $trackedChanges.Values) {
        $trackedTotal += $value
    }

    foreach ($imageReference in $allImages) {
        if ($imageReference.Placement -ne "vml" -and [string]::IsNullOrEmpty($imageReference.RelationshipId)) {
            $warnings.Add("A DrawingML image reference has no relationship id in $($imageReference.StoryPart).")
        }
        elseif (-not $imageReference.IsExternal -and -not $imageReference.TargetExists) {
            $errors.Add("An image reference could not be resolved in $($imageReference.StoryPart): $($imageReference.RelationshipId)")
        }
    }

    $packageManifestLines = @($partInventory | ForEach-Object { "$($_.Name)|$($_.Length)|$($_.Sha256)" })
    $manifestHash = Get-Sha256FromBytes -Bytes ([System.Text.Encoding]::UTF8.GetBytes(($packageManifestLines -join "`n")))
    $fileHashAfter = (Get-FileHash -LiteralPath $resolvedPath -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($fileHashBefore -ne $fileHashAfter) {
        $errors.Add("The input file changed while it was being inspected.")
    }

    $result = [pscustomobject][ordered]@{
        Tool = "inspect_docx.ps1"
        SchemaVersion = 1
        IsValid = ($errors.Count -eq 0)
        Path = $resolvedPath
        File = [pscustomobject][ordered]@{
            Length = [long]$item.Length
            Sha256Before = $fileHashBefore
            Sha256After = $fileHashAfter
            UnchangedDuringInspection = ($fileHashBefore -eq $fileHashAfter)
        }
        Package = [pscustomobject][ordered]@{
            PartCount = $partInventory.Count
            XmlPartCount = $xmlPartCount
            DuplicatePartNames = $duplicates
            ManifestSha256 = $manifestHash
            Parts = $partInventory.ToArray()
        }
        Totals = [pscustomobject]$totalCounts
        Stories = $stories.ToArray()
        Images = [pscustomobject][ordered]@{
            MediaPartCount = $mediaParts.Count
            ReferenceCount = $allImages.Count
            MediaParts = $mediaParts.ToArray()
            References = $allImages.ToArray()
        }
        Relationships = [pscustomobject][ordered]@{
            Count = $relationships.Count
            NormalizedSha256 = $relationshipHash
            DanglingInternalCount = $danglingRelationships.Count
            Items = $relationships.ToArray()
        }
        Hyperlinks = $allHyperlinks.ToArray()
        Bookmarks = $allBookmarks.ToArray()
        ContentControls = $allContentControls.ToArray()
        Security = [pscustomobject][ordered]@{
            DocumentProtectionPresent = ($null -ne $settingsProtection)
            DocumentProtection = $settingsProtection
            DigitalSignaturePresent = ($signatureParts.Count -gt 0)
            SignatureParts = $signatureParts
            MacroEnabledContentType = $macroContentType
            MacroOrActiveXPresent = ($macroParts.Count -gt 0 -or $macroContentType)
            MacroOrActiveXParts = $macroParts
        }
        TrackedChanges = [pscustomobject][ordered]@{
            Total = $trackedTotal
            ByType = [pscustomobject]$trackedChanges
        }
        Warnings = $warnings.ToArray()
        Errors = $errors.ToArray()
    }

    Write-ResultAndExit -Result $result -ExitCode $(if ($result.IsValid) { 0 } else { 2 })
}
catch {
    $failure = [pscustomobject][ordered]@{
        Tool = "inspect_docx.ps1"
        SchemaVersion = 1
        IsValid = $false
        Path = if ($null -ne $resolvedPath) { $resolvedPath } else { $Path }
        Errors = @($_.Exception.Message)
        ErrorType = $_.Exception.GetType().FullName
        ErrorLocation = $_.InvocationInfo.PositionMessage
        ErrorStack = $_.ScriptStackTrace
    }
    Write-ResultAndExit -Result $failure -ExitCode 2
}
finally {
    if ($null -ne $zip) {
        $zip.Dispose()
    }
    if ($null -ne $fileStream) {
        $fileStream.Dispose()
    }
}
