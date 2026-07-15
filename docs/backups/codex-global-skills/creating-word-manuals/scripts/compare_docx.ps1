<#
.SYNOPSIS
Compares a source Word package with a formatting-only candidate.

.DESCRIPTION
Returns a strict PASS, FAIL, or INVALID JSON report by default, or an object
with -AsObject. Part allowlists accept exact names, wildcards, or comma-separated
values. When -ReportPath is supplied, the same JSON is written atomically as
UTF-8 without a BOM. Existing reports are preserved unless -ForceReport is used.

.NOTES
Exit code 0 means PASS, 1 means a preservation check failed, and 2 means an
input or report was invalid.
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$SourcePath,

    [Parameter(Mandatory = $true, Position = 1)]
    [string]$CandidatePath,

    [string[]]$AllowedChangedParts = @("word/document.xml"),

    [string[]]$AllowedAddedParts = @(),

    [string[]]$AllowedRemovedParts = @(),

    [switch]$AsObject,

    [switch]$Compact,

    [string]$ReportPath,

    [switch]$ForceReport,

    [ValidateRange(4, 100)]
    [int]$JsonDepth = 18
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

# Checks whether a package part matches any allowed pattern.
function Test-PartAllowed {
    param(
        [string]$PartName,
        [string[]]$Patterns
    )

    foreach ($rawPattern in @($Patterns)) {
        foreach ($pattern in @($rawPattern -split "[,;]")) {
            $trimmedPattern = $pattern.Trim()
            if (-not [string]::IsNullOrWhiteSpace($trimmedPattern) -and $PartName -like $trimmedPattern) {
                return $true
            }
        }
    }
    return $false
}

# Splits and normalizes configured package part patterns.
function Expand-PartPatterns {
    param([string[]]$Patterns)

    $expanded = New-Object System.Collections.Generic.List[string]
    foreach ($rawPattern in @($Patterns)) {
        foreach ($pattern in @($rawPattern -split "[,;]")) {
            $trimmedPattern = $pattern.Trim()
            if (-not [string]::IsNullOrWhiteSpace($trimmedPattern)) {
                $expanded.Add($trimmedPattern)
            }
        }
    }
    return ,$expanded.ToArray()
}

# Finds the first differing item between two token sequences.
function Get-FirstMismatch {
    param(
        [string[]]$Left,
        [string[]]$Right
    )

    $limit = [Math]::Min($Left.Count, $Right.Count)
    for ($index = 0; $index -lt $limit; $index++) {
        if ($Left[$index] -cne $Right[$index]) {
            return [pscustomobject][ordered]@{
                Index = $index
                Source = Limit-DisplayText -Value $Left[$index]
                Candidate = Limit-DisplayText -Value $Right[$index]
            }
        }
    }
    if ($Left.Count -ne $Right.Count) {
        return [pscustomobject][ordered]@{
            Index = $limit
            Source = if ($limit -lt $Left.Count) { Limit-DisplayText -Value $Left[$limit] } else { $null }
            Candidate = if ($limit -lt $Right.Count) { Limit-DisplayText -Value $Right[$limit] } else { $null }
        }
    }
    return $null
}

# Truncates long diagnostic text for readable reports.
function Limit-DisplayText {
    param([string]$Value)

    if ($null -eq $Value -or $Value.Length -le 180) {
        return $Value
    }
    return $Value.Substring(0, 177) + "..."
}

# Compares keyed hashes to find added, removed, and changed parts.
function Get-MapDifferences {
    param(
        [hashtable]$SourceMap,
        [hashtable]$CandidateMap
    )

    $sourceNames = @($SourceMap.Keys | Sort-Object)
    $candidateNames = @($CandidateMap.Keys | Sort-Object)
    $added = @($candidateNames | Where-Object { -not $SourceMap.ContainsKey($_) })
    $removed = @($sourceNames | Where-Object { -not $CandidateMap.ContainsKey($_) })
    $changed = @($sourceNames | Where-Object { $CandidateMap.ContainsKey($_) -and $SourceMap[$_] -cne $CandidateMap[$_] })
    return [pscustomobject][ordered]@{
        Added = $added
        Removed = $removed
        Changed = $changed
    }
}

# Converts an XML node into a structural comparison token.
function Get-NodeStructureToken {
    param(
        [System.Xml.XmlNode]$Node,
        [System.Xml.XmlNamespaceManager]$NamespaceManager,
        [string]$StoryPart,
        [hashtable]$RelationshipLookup
    )

    $wNs = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
    $rNs = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    switch ($Node.LocalName) {
        "p" { return "P" }
        "r" { return "RUN" }
        "tbl" { return "TABLE" }
        "tr" { return "ROW" }
        "tc" { return "CELL" }
        "sectPr" { return "SECTION" }
        "sdt" {
            $aliasNode = $Node.SelectSingleNode("./w:sdtPr/w:alias", $NamespaceManager)
            $tagNode = $Node.SelectSingleNode("./w:sdtPr/w:tag", $NamespaceManager)
            $alias = if ($null -ne $aliasNode) { $aliasNode.GetAttribute("val", $wNs) } else { "" }
            $tag = if ($null -ne $tagNode) { $tagNode.GetAttribute("val", $wNs) } else { "" }
            return "CONTENT_CONTROL|$alias|$tag"
        }
        "hyperlink" {
            $relId = $Node.GetAttribute("id", $rNs)
            $anchor = $Node.GetAttribute("anchor", $wNs)
            return "HYPERLINK|$relId|$anchor"
        }
        "bookmarkStart" {
            return "BOOKMARK_START|$($Node.GetAttribute('id', $wNs))|$($Node.GetAttribute('name', $wNs))"
        }
        "bookmarkEnd" { return "BOOKMARK_END|$($Node.GetAttribute('id', $wNs))" }
        "fldSimple" { return "FIELD_SIMPLE|" + (Get-NormalizedText -Value $Node.GetAttribute("instr", $wNs)) }
        "fldChar" { return "FIELD_CHAR|$($Node.GetAttribute('fldCharType', $wNs))" }
        "br" { return "BREAK|$($Node.GetAttribute('type', $wNs))" }
        "lastRenderedPageBreak" { return "LAST_RENDERED_PAGE_BREAK" }
        "inline" {
            $blip = $Node.SelectSingleNode(".//a:blip", $NamespaceManager)
            $relId = if ($null -ne $blip) { $blip.GetAttribute("embed", $rNs) } else { "" }
            $key = "$StoryPart|$relId"
            $target = if ($RelationshipLookup.ContainsKey($key)) { $RelationshipLookup[$key].ResolvedTarget } else { "" }
            return "DRAWING|inline|$relId|$target"
        }
        "anchor" {
            $blip = $Node.SelectSingleNode(".//a:blip", $NamespaceManager)
            $relId = if ($null -ne $blip) { $blip.GetAttribute("embed", $rNs) } else { "" }
            $key = "$StoryPart|$relId"
            $target = if ($RelationshipLookup.ContainsKey($key)) { $RelationshipLookup[$key].ResolvedTarget } else { "" }
            return "DRAWING|anchor|$relId|$target"
        }
        "imagedata" {
            $relId = $Node.GetAttribute("id", $rNs)
            $key = "$StoryPart|$relId"
            $target = if ($RelationshipLookup.ContainsKey($key)) { $RelationshipLookup[$key].ResolvedTarget } else { "" }
            return "DRAWING|vml|$relId|$target"
        }
        "footnoteReference" { return "FOOTNOTE_REFERENCE|$($Node.GetAttribute('id', $wNs))" }
        "endnoteReference" { return "ENDNOTE_REFERENCE|$($Node.GetAttribute('id', $wNs))" }
        "commentRangeStart" { return "COMMENT_RANGE_START|$($Node.GetAttribute('id', $wNs))" }
        "commentRangeEnd" { return "COMMENT_RANGE_END|$($Node.GetAttribute('id', $wNs))" }
        default { return $Node.LocalName.ToUpperInvariant() }
    }
}

# Captures semantic and structural details for a Word story part.
function Get-StorySnapshot {
    param(
        [string]$StoryPart,
        [byte[]]$Bytes,
        [hashtable]$RelationshipLookup
    )

    $xml = Get-XmlFromBytes -Bytes $Bytes -PartName $StoryPart
    $ns = New-WordNamespaceManager -Xml $xml
    $wNs = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
    $rNs = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"

    $semanticTokens = New-Object System.Collections.Generic.List[string]
    $semanticNodes = $xml.SelectNodes("//w:p | //w:tbl | //w:tr | //w:tc | //w:t | //w:tab | //w:br | //w:cr | //w:noBreakHyphen | //w:softHyphen | //w:sym | //w:fldSimple | //w:fldChar | //w:instrText | //w:hyperlink | //w:bookmarkStart | //wp:inline | //wp:anchor | //v:imagedata", $ns)
    foreach ($node in $semanticNodes) {
        switch ($node.LocalName) {
            "p" { $semanticTokens.Add("P") }
            "tbl" { $semanticTokens.Add("TABLE") }
            "tr" { $semanticTokens.Add("ROW") }
            "tc" { $semanticTokens.Add("CELL") }
            "t" { $semanticTokens.Add("TEXT|" + $node.InnerText) }
            "tab" { $semanticTokens.Add("TAB") }
            "br" { $semanticTokens.Add("BREAK|" + $node.GetAttribute("type", $wNs)) }
            "cr" { $semanticTokens.Add("CR") }
            "noBreakHyphen" { $semanticTokens.Add("NO_BREAK_HYPHEN") }
            "softHyphen" { $semanticTokens.Add("SOFT_HYPHEN") }
            "sym" { $semanticTokens.Add("SYMBOL|$($node.GetAttribute('font', $wNs))|$($node.GetAttribute('char', $wNs))") }
            "fldSimple" { $semanticTokens.Add("FIELD_SIMPLE|" + (Get-NormalizedText -Value $node.GetAttribute("instr", $wNs))) }
            "fldChar" { $semanticTokens.Add("FIELD_CHAR|" + $node.GetAttribute("fldCharType", $wNs)) }
            "instrText" { $semanticTokens.Add("FIELD_INSTR|" + (Get-NormalizedText -Value $node.InnerText)) }
            "hyperlink" { $semanticTokens.Add("HYPERLINK|$($node.GetAttribute('id', $rNs))|$($node.GetAttribute('anchor', $wNs))") }
            "bookmarkStart" { $semanticTokens.Add("BOOKMARK|" + $node.GetAttribute("name", $wNs)) }
            "inline" {
                $blip = $node.SelectSingleNode(".//a:blip", $ns)
                $relId = if ($null -ne $blip) { $blip.GetAttribute("embed", $rNs) } else { "" }
                $key = "$StoryPart|$relId"
                $target = if ($RelationshipLookup.ContainsKey($key)) { $RelationshipLookup[$key].ResolvedTarget } else { "" }
                $semanticTokens.Add("DRAWING|inline|$target")
            }
            "anchor" {
                $blip = $node.SelectSingleNode(".//a:blip", $ns)
                $relId = if ($null -ne $blip) { $blip.GetAttribute("embed", $rNs) } else { "" }
                $key = "$StoryPart|$relId"
                $target = if ($RelationshipLookup.ContainsKey($key)) { $RelationshipLookup[$key].ResolvedTarget } else { "" }
                $semanticTokens.Add("DRAWING|anchor|$target")
            }
            "imagedata" {
                $relId = $node.GetAttribute("id", $rNs)
                $key = "$StoryPart|$relId"
                $target = if ($RelationshipLookup.ContainsKey($key)) { $RelationshipLookup[$key].ResolvedTarget } else { "" }
                $semanticTokens.Add("DRAWING|vml|$target")
            }
        }
    }

    $structureTokens = New-Object System.Collections.Generic.List[string]
    $structureNodes = $xml.SelectNodes("//w:p | //w:r | //w:tbl | //w:tr | //w:tc | //w:sectPr | //w:sdt | //w:hyperlink | //w:bookmarkStart | //w:bookmarkEnd | //w:fldSimple | //w:fldChar | //w:br | //w:lastRenderedPageBreak | //wp:inline | //wp:anchor | //v:imagedata | //w:footnoteReference | //w:endnoteReference | //w:commentRangeStart | //w:commentRangeEnd", $ns)
    foreach ($node in $structureNodes) {
        $structureTokens.Add((Get-NodeStructureToken -Node $node -NamespaceManager $ns -StoryPart $StoryPart -RelationshipLookup $RelationshipLookup))
    }

    $counts = [ordered]@{
        Paragraphs = @($xml.SelectNodes("//w:p", $ns)).Count
        Runs = @($xml.SelectNodes("//w:r", $ns)).Count
        Tables = @($xml.SelectNodes("//w:tbl", $ns)).Count
        Rows = @($xml.SelectNodes("//w:tr", $ns)).Count
        Cells = @($xml.SelectNodes("//w:tc", $ns)).Count
        Sections = @($xml.SelectNodes("//w:sectPr", $ns)).Count
        Drawings = @($xml.SelectNodes("//wp:inline | //wp:anchor | //v:imagedata", $ns)).Count
        InlineDrawings = @($xml.SelectNodes("//wp:inline", $ns)).Count
        AnchoredDrawings = @($xml.SelectNodes("//wp:anchor", $ns)).Count
        LegacyVmlImages = @($xml.SelectNodes("//v:imagedata", $ns)).Count
        Hyperlinks = @($xml.SelectNodes("//w:hyperlink", $ns)).Count
        BookmarkStarts = @($xml.SelectNodes("//w:bookmarkStart", $ns)).Count
        BookmarkEnds = @($xml.SelectNodes("//w:bookmarkEnd", $ns)).Count
        Breaks = @($xml.SelectNodes("//w:br", $ns)).Count
        LastRenderedPageBreaks = @($xml.SelectNodes("//w:lastRenderedPageBreak", $ns)).Count
        ContentControls = @($xml.SelectNodes("//w:sdt", $ns)).Count
        SimpleFields = @($xml.SelectNodes("//w:fldSimple", $ns)).Count
        ComplexFieldBegins = @($xml.SelectNodes("//w:fldChar[@w:fldCharType='begin']", $ns)).Count
        FootnoteReferences = @($xml.SelectNodes("//w:footnoteReference", $ns)).Count
        EndnoteReferences = @($xml.SelectNodes("//w:endnoteReference", $ns)).Count
        CommentRangeStarts = @($xml.SelectNodes("//w:commentRangeStart", $ns)).Count
        CommentRangeEnds = @($xml.SelectNodes("//w:commentRangeEnd", $ns)).Count
    }
    $countLines = @($counts.Keys | ForEach-Object { "$_=$($counts[$_])" })

    $semanticArray = $semanticTokens.ToArray()
    $structureArray = $structureTokens.ToArray()
    return [pscustomobject][ordered]@{
        Part = $StoryPart
        Counts = [pscustomobject]$counts
        CountsSha256 = Get-Sha256FromBytes -Bytes ([System.Text.Encoding]::UTF8.GetBytes(($countLines -join "`n")))
        SemanticTokens = $semanticArray
        SemanticTokenCount = $semanticArray.Count
        SemanticSha256 = Get-Sha256FromBytes -Bytes ([System.Text.Encoding]::UTF8.GetBytes(($semanticArray -join "`n")))
        StructureTokens = $structureArray
        StructureTokenCount = $structureArray.Count
        StructureSha256 = Get-Sha256FromBytes -Bytes ([System.Text.Encoding]::UTF8.GetBytes(($structureArray -join "`n")))
    }
}

# Validates a Word package and captures its comparison snapshot.
function Get-PackageSnapshot {
    param(
        [string]$InputPath,
        [string]$Label
    )

    $item = Get-Item -LiteralPath $InputPath -ErrorAction Stop
    if ($item.PSIsContainer) {
        throw "$Label path is a directory, not a DOCX file."
    }
    if ($item.Extension -notin @(".docx", ".docm", ".dotx", ".dotm")) {
        throw "$Label extension is not a supported Word package extension."
    }

    $resolvedPath = $item.FullName
    $fileHashBefore = (Get-FileHash -LiteralPath $resolvedPath -Algorithm SHA256).Hash.ToLowerInvariant()
    $stream = $null
    $zip = $null
    try {
        $stream = [System.IO.File]::Open($resolvedPath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::Read)
        $zip = New-Object System.IO.Compression.ZipArchive($stream, [System.IO.Compression.ZipArchiveMode]::Read, $false)
        $groups = $zip.Entries | Group-Object -Property FullName
        $duplicates = @($groups | Where-Object { $_.Count -gt 1 } | ForEach-Object { $_.Name })
        if ($duplicates.Count -gt 0) {
            throw "$Label has duplicate package part names: $($duplicates -join ', ')"
        }

        $entryMap = @{}
        foreach ($entry in $zip.Entries) {
            if (-not [string]::IsNullOrEmpty($entry.FullName) -and -not $entry.FullName.EndsWith("/")) {
                $entryMap[$entry.FullName] = $entry
            }
        }
        foreach ($entryName in @($entryMap.Keys)) {
            $normalizedEntryName = Normalize-PartPath -PartPath $entryName
            if ($entryName.Contains("\") -or $entryName.StartsWith("/") -or $null -eq $normalizedEntryName -or $normalizedEntryName -cne $entryName) {
                throw "$Label has an unsafe or non-canonical package part name: $entryName"
            }
        }
        foreach ($requiredPart in @("[Content_Types].xml", "_rels/.rels", "word/document.xml")) {
            if (-not $entryMap.ContainsKey($requiredPart)) {
                throw "$Label is missing required package part: $requiredPart"
            }
        }

        $partHashes = @{}
        $partBytes = @{}
        foreach ($name in @($entryMap.Keys | Sort-Object)) {
            $bytes = Get-EntryBytes -Entry $entryMap[$name]
            $partBytes[$name] = $bytes
            $partHashes[$name] = Get-Sha256FromBytes -Bytes $bytes
        }

        $xmlPartCount = 0
        foreach ($xmlPartName in @($entryMap.Keys | Where-Object { $_ -match "\.(xml|rels)$" } | Sort-Object)) {
            [void](Get-XmlFromBytes -Bytes $partBytes[$xmlPartName] -PartName $xmlPartName)
            $xmlPartCount++
        }
        $contentTypesXml = Get-XmlFromBytes -Bytes $partBytes["[Content_Types].xml"] -PartName "[Content_Types].xml"
        if ($null -eq $contentTypesXml.DocumentElement -or $contentTypesXml.DocumentElement.LocalName -ne "Types") {
            throw "$Label content types package part does not have a valid Types root element."
        }

        $relationshipItems = New-Object System.Collections.Generic.List[object]
        $relationshipLookup = @{}
        foreach ($relsName in @($entryMap.Keys | Where-Object { $_ -match "\.rels$" } | Sort-Object)) {
            $sourcePart = Get-RelationshipSourcePart -RelationshipPart $relsName
            if ($null -eq $sourcePart) {
                throw "$Label has an unrecognized relationship part path: $relsName"
            }
            $relsXml = Get-XmlFromBytes -Bytes $partBytes[$relsName] -PartName $relsName
            foreach ($relNode in $relsXml.DocumentElement.ChildNodes) {
                if ($relNode.LocalName -ne "Relationship") {
                    continue
                }
                $id = $relNode.GetAttribute("Id")
                $type = $relNode.GetAttribute("Type")
                $target = $relNode.GetAttribute("Target")
                $targetMode = $relNode.GetAttribute("TargetMode")
                $resolvedTarget = Resolve-RelationshipTarget -SourcePart $sourcePart -Target $target -TargetMode $targetMode
                if ($targetMode -ne "External" -and ($null -eq $resolvedTarget -or -not $entryMap.ContainsKey($resolvedTarget))) {
                    throw "$Label has a dangling internal relationship in $relsName ($id -> $target)."
                }
                $relObject = [pscustomobject][ordered]@{
                    RelationshipPart = $relsName
                    SourcePart = $sourcePart
                    Id = $id
                    Type = $type
                    Target = $target
                    TargetMode = $targetMode
                    ResolvedTarget = $resolvedTarget
                }
                $relationshipItems.Add($relObject)
                $relationshipKey = "$sourcePart|$id"
                if ($relationshipLookup.ContainsKey($relationshipKey)) {
                    throw "$Label has duplicate relationship id '$id' for source part '$sourcePart'."
                }
                $relationshipLookup[$relationshipKey] = $relObject
            }
        }
        $relationshipTokens = @($relationshipItems | Sort-Object RelationshipPart, Id | ForEach-Object {
            "$($_.RelationshipPart)|$($_.SourcePart)|$($_.Id)|$($_.Type)|$($_.Target)|$($_.TargetMode)|$($_.ResolvedTarget)"
        })

        $stories = @{}
        foreach ($storyPart in @($entryMap.Keys | Where-Object { Test-IsStoryPart -Name $_ } | Sort-Object)) {
            $stories[$storyPart] = Get-StorySnapshot -StoryPart $storyPart -Bytes $partBytes[$storyPart] -RelationshipLookup $relationshipLookup
        }

        $mediaHashes = @{}
        foreach ($mediaPart in @($entryMap.Keys | Where-Object { $_ -match "^word/media/" } | Sort-Object)) {
            $mediaHashes[$mediaPart] = $partHashes[$mediaPart]
        }

        $manifestTokens = @($partHashes.Keys | Sort-Object | ForEach-Object { "$_|$($partHashes[$_])" })
        return [pscustomobject][ordered]@{
            Label = $Label
            Path = $resolvedPath
            Length = [long]$item.Length
            FileSha256Before = $fileHashBefore
            PartNames = @($entryMap.Keys | Sort-Object)
            XmlPartCount = $xmlPartCount
            PartHashes = $partHashes
            ManifestSha256 = Get-Sha256FromBytes -Bytes ([System.Text.Encoding]::UTF8.GetBytes(($manifestTokens -join "`n")))
            Stories = $stories
            MediaHashes = $mediaHashes
            RelationshipTokens = $relationshipTokens
            RelationshipSha256 = Get-Sha256FromBytes -Bytes ([System.Text.Encoding]::UTF8.GetBytes(($relationshipTokens -join "`n")))
        }
    }
    finally {
        if ($null -ne $zip) {
            $zip.Dispose()
        }
        if ($null -ne $stream) {
            $stream.Dispose()
        }
    }
}

# Creates a named validation check result.
function New-Check {
    param(
        [string]$Name,
        [bool]$Pass,
        [object]$Details
    )

    return [pscustomobject][ordered]@{
        Name = $Name
        Pass = $Pass
        Details = $Details
    }
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
            if ($Result.PSObject.Properties.Name -contains "Status") {
                $Result.Status = "INVALID"
            }
            if ($Result.PSObject.Properties.Name -contains "IsPass") {
                $Result.IsPass = $false
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

$sourceSnapshot = $null
$candidateSnapshot = $null
$sourceResolvedPath = $null
$candidateResolvedPath = $null
$script:ResolvedReportPath = $null
$script:ReportWritable = $false

try {
    Add-Type -AssemblyName System.IO.Compression
    Add-Type -AssemblyName System.IO.Compression.FileSystem

    $AllowedChangedParts = Expand-PartPatterns -Patterns $AllowedChangedParts
    $AllowedAddedParts = Expand-PartPatterns -Patterns $AllowedAddedParts
    $AllowedRemovedParts = Expand-PartPatterns -Patterns $AllowedRemovedParts

    $sourceSnapshot = Get-PackageSnapshot -InputPath $SourcePath -Label "Source"
    $candidateSnapshot = Get-PackageSnapshot -InputPath $CandidatePath -Label "Candidate"
    $sourceResolvedPath = $sourceSnapshot.Path
    $candidateResolvedPath = $candidateSnapshot.Path

    if (-not [string]::IsNullOrWhiteSpace($ReportPath)) {
        $script:ResolvedReportPath = [System.IO.Path]::GetFullPath($ReportPath)
        if ($script:ResolvedReportPath -ieq $sourceResolvedPath -or $script:ResolvedReportPath -ieq $candidateResolvedPath) {
            throw "ReportPath must not point to either input Word file."
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

    $checks = New-Object System.Collections.Generic.List[object]
    $partDifferences = Get-MapDifferences -SourceMap $sourceSnapshot.PartHashes -CandidateMap $candidateSnapshot.PartHashes
    $unexpectedChanged = @($partDifferences.Changed | Where-Object { -not (Test-PartAllowed -PartName $_ -Patterns $AllowedChangedParts) })
    $unexpectedAdded = @($partDifferences.Added | Where-Object { -not (Test-PartAllowed -PartName $_ -Patterns $AllowedAddedParts) })
    $unexpectedRemoved = @($partDifferences.Removed | Where-Object { -not (Test-PartAllowed -PartName $_ -Patterns $AllowedRemovedParts) })
    $checks.Add((New-Check -Name "Package part names" -Pass ($unexpectedAdded.Count -eq 0 -and $unexpectedRemoved.Count -eq 0) -Details ([pscustomobject][ordered]@{
        Added = $partDifferences.Added
        Removed = $partDifferences.Removed
        UnexpectedAdded = $unexpectedAdded
        UnexpectedRemoved = $unexpectedRemoved
    })))
    $checks.Add((New-Check -Name "Changed part allowlist" -Pass ($unexpectedChanged.Count -eq 0) -Details ([pscustomobject][ordered]@{
        Changed = $partDifferences.Changed
        AllowedChanged = @($partDifferences.Changed | Where-Object { Test-PartAllowed -PartName $_ -Patterns $AllowedChangedParts })
        UnexpectedChanged = $unexpectedChanged
    })))

    $mediaDifferences = Get-MapDifferences -SourceMap $sourceSnapshot.MediaHashes -CandidateMap $candidateSnapshot.MediaHashes
    $mediaPass = ($mediaDifferences.Added.Count -eq 0 -and $mediaDifferences.Removed.Count -eq 0 -and $mediaDifferences.Changed.Count -eq 0)
    $checks.Add((New-Check -Name "Media bytes" -Pass $mediaPass -Details $mediaDifferences))

    $relationshipsSame = ($sourceSnapshot.RelationshipSha256 -ceq $candidateSnapshot.RelationshipSha256 -and $sourceSnapshot.RelationshipTokens.Count -eq $candidateSnapshot.RelationshipTokens.Count)
    $relationshipMismatch = if ($relationshipsSame) { $null } else { Get-FirstMismatch -Left $sourceSnapshot.RelationshipTokens -Right $candidateSnapshot.RelationshipTokens }
    $checks.Add((New-Check -Name "Relationships" -Pass $relationshipsSame -Details ([pscustomobject][ordered]@{
        SourceCount = $sourceSnapshot.RelationshipTokens.Count
        CandidateCount = $candidateSnapshot.RelationshipTokens.Count
        SourceSha256 = $sourceSnapshot.RelationshipSha256
        CandidateSha256 = $candidateSnapshot.RelationshipSha256
        FirstMismatch = $relationshipMismatch
    })))

    $sourceStoryParts = @($sourceSnapshot.Stories.Keys | Sort-Object)
    $candidateStoryParts = @($candidateSnapshot.Stories.Keys | Sort-Object)
    $storyPartsAdded = @($candidateStoryParts | Where-Object { -not $sourceSnapshot.Stories.ContainsKey($_) })
    $storyPartsRemoved = @($sourceStoryParts | Where-Object { -not $candidateSnapshot.Stories.ContainsKey($_) })
    $storyDetails = New-Object System.Collections.Generic.List[object]
    $allStorySemanticsPass = ($storyPartsAdded.Count -eq 0 -and $storyPartsRemoved.Count -eq 0)
    $allStoryStructurePass = $allStorySemanticsPass
    foreach ($storyPart in @($sourceStoryParts | Where-Object { $candidateSnapshot.Stories.ContainsKey($_) })) {
        $sourceStory = $sourceSnapshot.Stories[$storyPart]
        $candidateStory = $candidateSnapshot.Stories[$storyPart]
        $semanticSame = ($sourceStory.SemanticSha256 -ceq $candidateStory.SemanticSha256 -and $sourceStory.SemanticTokenCount -eq $candidateStory.SemanticTokenCount)
        $countsSame = ($sourceStory.CountsSha256 -ceq $candidateStory.CountsSha256)
        $structureSame = ($sourceStory.StructureSha256 -ceq $candidateStory.StructureSha256 -and $sourceStory.StructureTokenCount -eq $candidateStory.StructureTokenCount)
        if (-not $semanticSame) {
            $allStorySemanticsPass = $false
        }
        if (-not $countsSame -or -not $structureSame) {
            $allStoryStructurePass = $false
        }
        $storyDetails.Add([pscustomobject][ordered]@{
            Part = $storyPart
            SemanticTokensSame = $semanticSame
            StructuralCountsSame = $countsSame
            StructuralOrderSame = $structureSame
            SourceCounts = $sourceStory.Counts
            CandidateCounts = $candidateStory.Counts
            SourceSemanticSha256 = $sourceStory.SemanticSha256
            CandidateSemanticSha256 = $candidateStory.SemanticSha256
            SourceStructureSha256 = $sourceStory.StructureSha256
            CandidateStructureSha256 = $candidateStory.StructureSha256
            FirstSemanticMismatch = if ($semanticSame) { $null } else { Get-FirstMismatch -Left $sourceStory.SemanticTokens -Right $candidateStory.SemanticTokens }
            FirstStructureMismatch = if ($structureSame) { $null } else { Get-FirstMismatch -Left $sourceStory.StructureTokens -Right $candidateStory.StructureTokens }
        })
    }
    $checks.Add((New-Check -Name "Story semantic tokens" -Pass $allStorySemanticsPass -Details ([pscustomobject][ordered]@{
        AddedStoryParts = $storyPartsAdded
        RemovedStoryParts = $storyPartsRemoved
        Stories = $storyDetails.ToArray()
    })))
    $checks.Add((New-Check -Name "Story structural counts and order" -Pass $allStoryStructurePass -Details ([pscustomobject][ordered]@{
        AddedStoryParts = $storyPartsAdded
        RemovedStoryParts = $storyPartsRemoved
        Stories = $storyDetails.ToArray()
    })))

    $sourceHashAfter = (Get-FileHash -LiteralPath $sourceResolvedPath -Algorithm SHA256).Hash.ToLowerInvariant()
    $candidateHashAfter = (Get-FileHash -LiteralPath $candidateResolvedPath -Algorithm SHA256).Hash.ToLowerInvariant()
    $sourceUnchanged = ($sourceSnapshot.FileSha256Before -ceq $sourceHashAfter)
    $candidateUnchanged = ($candidateSnapshot.FileSha256Before -ceq $candidateHashAfter)
    $checks.Add((New-Check -Name "Inputs unchanged during comparison" -Pass ($sourceUnchanged -and $candidateUnchanged) -Details ([pscustomobject][ordered]@{
        SourceUnchanged = $sourceUnchanged
        CandidateUnchanged = $candidateUnchanged
    })))

    $failedChecks = @($checks | Where-Object { -not $_.Pass })
    $isPass = ($failedChecks.Count -eq 0)
    $result = [pscustomobject][ordered]@{
        Tool = "compare_docx.ps1"
        SchemaVersion = 1
        Status = if ($isPass) { "PASS" } else { "FAIL" }
        IsPass = $isPass
        Source = [pscustomobject][ordered]@{
            Path = $sourceResolvedPath
            Length = $sourceSnapshot.Length
            Sha256Before = $sourceSnapshot.FileSha256Before
            Sha256After = $sourceHashAfter
            UnchangedDuringComparison = $sourceUnchanged
            PartCount = $sourceSnapshot.PartNames.Count
            XmlPartCount = $sourceSnapshot.XmlPartCount
            ManifestSha256 = $sourceSnapshot.ManifestSha256
        }
        Candidate = [pscustomobject][ordered]@{
            Path = $candidateResolvedPath
            Length = $candidateSnapshot.Length
            Sha256Before = $candidateSnapshot.FileSha256Before
            Sha256After = $candidateHashAfter
            UnchangedDuringComparison = $candidateUnchanged
            PartCount = $candidateSnapshot.PartNames.Count
            XmlPartCount = $candidateSnapshot.XmlPartCount
            ManifestSha256 = $candidateSnapshot.ManifestSha256
        }
        Policy = [pscustomobject][ordered]@{
            AllowedChangedParts = @($AllowedChangedParts)
            AllowedAddedParts = @($AllowedAddedParts)
            AllowedRemovedParts = @($AllowedRemovedParts)
            MediaBytesMustMatch = $true
            RelationshipsMustMatch = $true
            StorySemanticsMustMatch = $true
            StoryStructureMustMatch = $true
        }
        Summary = [pscustomobject][ordered]@{
            CheckCount = $checks.Count
            FailedCheckCount = $failedChecks.Count
            FailedChecks = @($failedChecks | ForEach-Object { $_.Name })
            ChangedParts = $partDifferences.Changed
            UnexpectedChangedParts = $unexpectedChanged
            AddedParts = $partDifferences.Added
            UnexpectedAddedParts = $unexpectedAdded
            RemovedParts = $partDifferences.Removed
            UnexpectedRemovedParts = $unexpectedRemoved
            SourceStoryCount = $sourceStoryParts.Count
            CandidateStoryCount = $candidateStoryParts.Count
            SourceMediaCount = $sourceSnapshot.MediaHashes.Count
            CandidateMediaCount = $candidateSnapshot.MediaHashes.Count
        }
        Checks = $checks.ToArray()
        Errors = @()
    }

    Write-ResultAndExit -Result $result -ExitCode $(if ($isPass) { 0 } else { 1 })
}
catch {
    $sourceHashAfterFailure = $null
    $candidateHashAfterFailure = $null
    if ($null -ne $sourceResolvedPath -and (Test-Path -LiteralPath $sourceResolvedPath -PathType Leaf)) {
        $sourceHashAfterFailure = (Get-FileHash -LiteralPath $sourceResolvedPath -Algorithm SHA256).Hash.ToLowerInvariant()
    }
    if ($null -ne $candidateResolvedPath -and (Test-Path -LiteralPath $candidateResolvedPath -PathType Leaf)) {
        $candidateHashAfterFailure = (Get-FileHash -LiteralPath $candidateResolvedPath -Algorithm SHA256).Hash.ToLowerInvariant()
    }
    $failure = [pscustomobject][ordered]@{
        Tool = "compare_docx.ps1"
        SchemaVersion = 1
        Status = "INVALID"
        IsPass = $false
        SourcePath = if ($null -ne $sourceResolvedPath) { $sourceResolvedPath } else { $SourcePath }
        CandidatePath = if ($null -ne $candidateResolvedPath) { $candidateResolvedPath } else { $CandidatePath }
        SourceSha256AfterFailure = $sourceHashAfterFailure
        CandidateSha256AfterFailure = $candidateHashAfterFailure
        Errors = @($_.Exception.Message)
        ErrorType = $_.Exception.GetType().FullName
        ErrorLocation = $_.InvocationInfo.PositionMessage
        ErrorStack = $_.ScriptStackTrace
    }
    Write-ResultAndExit -Result $failure -ExitCode 2
}
