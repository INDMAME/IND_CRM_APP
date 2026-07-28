param(
    [Parameter(Mandatory = $true)]
    [string]$SourcePath,

    [Parameter(Mandatory = $true)]
    [string]$OutputPath,

    [Parameter(Mandatory = $true)]
    [string]$PalettePath,

    [bool]$ColorBoldTerms = $true,

    [bool]$ColorHyperlinks = $true,

    [bool]$ColorLiteralBullets = $true
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$wNamespace = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
$bulletCharacter = [string][char]0x2022

# Return an optional property without triggering StrictMode errors.
function Get-OptionalProperty {
    param(
        [Parameter(Mandatory = $true)]
        [object]$Object,

        [Parameter(Mandatory = $true)]
        [string]$Name
    )

    $property = $Object.PSObject.Properties[$Name]
    if ($null -eq $property) {
        return $null
    }
    return $property.Value
}

# Read one XML package part while preserving existing whitespace.
function Read-ZipXml {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path,

        [Parameter(Mandatory = $true)]
        [string]$EntryName
    )

    $archive = [System.IO.Compression.ZipFile]::OpenRead($Path)
    try {
        $entry = $archive.GetEntry($EntryName)
        if ($null -eq $entry) {
            throw "Missing DOCX package part: $EntryName"
        }

        $reader = [System.IO.StreamReader]::new($entry.Open(), [System.Text.Encoding]::UTF8, $true)
        try {
            $content = $reader.ReadToEnd()
        }
        finally {
            $reader.Dispose()
        }
    }
    finally {
        $archive.Dispose()
    }

    $xml = [System.Xml.XmlDocument]::new()
    $xml.PreserveWhitespace = $true
    $xml.LoadXml($content)
    Write-Output -NoEnumerate $xml
}

# Set a WordprocessingML attribute without emitting pipeline output.
function Set-WAttribute {
    param(
        [Parameter(Mandatory = $true)]
        [System.Xml.XmlElement]$Element,

        [Parameter(Mandatory = $true)]
        [string]$Name,

        [Parameter(Mandatory = $true)]
        [string]$Value
    )

    [void]$Element.SetAttribute($Name, $wNamespace, $Value)
}

# Remove theme attributes so an explicit RGB value remains deterministic.
function Remove-WThemeAttributes {
    param(
        [Parameter(Mandatory = $true)]
        [System.Xml.XmlElement]$Element,

        [Parameter(Mandatory = $true)]
        [string[]]$Names
    )

    foreach ($name in $Names) {
        [void]$Element.RemoveAttribute($name, $wNamespace)
    }
}

# Return visible paragraph text without changing whitespace in the XML.
function Get-ParagraphText {
    param(
        [Parameter(Mandatory = $true)]
        [System.Xml.XmlElement]$Paragraph,

        [Parameter(Mandatory = $true)]
        [System.Xml.XmlNamespaceManager]$NamespaceManager
    )

    return (($Paragraph.SelectNodes('.//w:t', $NamespaceManager) | ForEach-Object { $_.InnerText }) -join '').Trim()
}

# Interpret the Word on/off value used by bold and related properties.
function Test-WOn {
    param(
        [System.Xml.XmlElement]$Element
    )

    if ($null -eq $Element) {
        return $false
    }

    $value = $Element.GetAttribute('val', $wNamespace)
    return [string]::IsNullOrEmpty($value) -or $value -in @('1', 'true', 'on')
}

# Create run properties as the first run child when they do not exist.
function Ensure-RunProperties {
    param(
        [Parameter(Mandatory = $true)]
        [System.Xml.XmlElement]$Run,

        [Parameter(Mandatory = $true)]
        [System.Xml.XmlNamespaceManager]$NamespaceManager
    )

    $runProperties = $Run.SelectSingleNode('./w:rPr', $NamespaceManager)
    if ($null -eq $runProperties) {
        $runProperties = $Run.OwnerDocument.CreateElement('w', 'rPr', $wNamespace)
        if ($null -eq $Run.FirstChild) {
            [void]$Run.AppendChild($runProperties)
        }
        else {
            [void]$Run.InsertBefore($runProperties, $Run.FirstChild)
        }
    }
    return [System.Xml.XmlElement]$runProperties
}

# Insert w:color in schema order before size and later run properties.
function Ensure-RunColor {
    param(
        [Parameter(Mandatory = $true)]
        [System.Xml.XmlElement]$RunProperties,

        [Parameter(Mandatory = $true)]
        [System.Xml.XmlNamespaceManager]$NamespaceManager
    )

    $color = $RunProperties.SelectSingleNode('./w:color', $NamespaceManager)
    if ($null -ne $color) {
        return [System.Xml.XmlElement]$color
    }

    $color = $RunProperties.OwnerDocument.CreateElement('w', 'color', $wNamespace)
    $followingNames = @(
        'spacing', 'w', 'kern', 'position', 'sz', 'szCs', 'highlight', 'u',
        'effect', 'bdr', 'shd', 'fitText', 'vertAlign', 'rtl', 'cs', 'em',
        'lang', 'eastAsianLayout', 'specVanish', 'oMath', 'rPrChange'
    )

    $insertBefore = $null
    foreach ($child in $RunProperties.ChildNodes) {
        if ($child.NamespaceURI -eq $wNamespace -and $child.LocalName -in $followingNames) {
            $insertBefore = $child
            break
        }
    }

    if ($null -eq $insertBefore) {
        [void]$RunProperties.AppendChild($color)
    }
    else {
        [void]$RunProperties.InsertBefore($color, $insertBefore)
    }
    return [System.Xml.XmlElement]$color
}

# Apply one explicit six-digit RGB color to an existing run.
function Set-RunColor {
    param(
        [Parameter(Mandatory = $true)]
        [System.Xml.XmlElement]$Run,

        [Parameter(Mandatory = $true)]
        [string]$Color,

        [Parameter(Mandatory = $true)]
        [System.Xml.XmlNamespaceManager]$NamespaceManager
    )

    $runProperties = Ensure-RunProperties -Run $Run -NamespaceManager $NamespaceManager
    $colorElement = Ensure-RunColor -RunProperties $runProperties -NamespaceManager $NamespaceManager
    Remove-WThemeAttributes -Element $colorElement -Names @('themeColor', 'themeTint', 'themeShade')
    Set-WAttribute -Element $colorElement -Name 'val' -Value $Color
}

# Apply one color to every visible run in a paragraph.
function Set-ParagraphColor {
    param(
        [Parameter(Mandatory = $true)]
        [System.Xml.XmlElement]$Paragraph,

        [Parameter(Mandatory = $true)]
        [string]$Color,

        [Parameter(Mandatory = $true)]
        [System.Xml.XmlNamespaceManager]$NamespaceManager
    )

    $count = 0
    foreach ($run in $Paragraph.SelectNodes('.//w:r[w:t]', $NamespaceManager)) {
        Set-RunColor -Run $run -Color $Color -NamespaceManager $NamespaceManager
        $count++
    }
    return $count
}

# Replace an existing callout fill and border without changing its geometry.
function Set-CalloutAppearance {
    param(
        [Parameter(Mandatory = $true)]
        [System.Xml.XmlElement]$Paragraph,

        [Parameter(Mandatory = $true)]
        [string]$BorderColor,

        [Parameter(Mandatory = $true)]
        [string]$FillColor,

        [Parameter(Mandatory = $true)]
        [System.Xml.XmlNamespaceManager]$NamespaceManager
    )

    $shading = $Paragraph.SelectSingleNode('./w:pPr/w:shd', $NamespaceManager)
    $borders = @($Paragraph.SelectNodes('./w:pPr/w:pBdr/*', $NamespaceManager))
    if ($null -eq $shading -or $borders.Count -eq 0) {
        return $false
    }

    Remove-WThemeAttributes -Element $shading -Names @(
        'themeFill', 'themeFillTint', 'themeFillShade',
        'themeColor', 'themeTint', 'themeShade'
    )
    Set-WAttribute -Element $shading -Name 'val' -Value 'clear'
    Set-WAttribute -Element $shading -Name 'color' -Value 'auto'
    Set-WAttribute -Element $shading -Name 'fill' -Value $FillColor

    foreach ($border in $borders) {
        Remove-WThemeAttributes -Element $border -Names @('themeColor', 'themeTint', 'themeShade')
        Set-WAttribute -Element $border -Name 'color' -Value $BorderColor
    }
    return $true
}

# Replace one package entry while copying all other entries from the source.
function Replace-ZipEntry {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path,

        [Parameter(Mandatory = $true)]
        [string]$EntryName,

        [Parameter(Mandatory = $true)]
        [string]$Content
    )

    $stream = [System.IO.File]::Open(
        $Path,
        [System.IO.FileMode]::Open,
        [System.IO.FileAccess]::ReadWrite,
        [System.IO.FileShare]::None
    )
    try {
        $archive = [System.IO.Compression.ZipArchive]::new(
            $stream,
            [System.IO.Compression.ZipArchiveMode]::Update,
            $false
        )
        try {
            $matches = @($archive.Entries | Where-Object { $_.FullName -eq $EntryName })
            if ($matches.Count -ne 1) {
                throw "Expected one $EntryName entry, found $($matches.Count)."
            }

            $matches[0].Delete()
            $entry = $archive.CreateEntry($EntryName, [System.IO.Compression.CompressionLevel]::Optimal)
            $writer = [System.IO.StreamWriter]::new(
                $entry.Open(),
                [System.Text.UTF8Encoding]::new($false)
            )
            try {
                $writer.Write($Content)
            }
            finally {
                $writer.Dispose()
            }
        }
        finally {
            $archive.Dispose()
        }
    }
    finally {
        $stream.Dispose()
    }
}

if (-not (Test-Path -LiteralPath $SourcePath -PathType Leaf)) {
    throw "Source DOCX does not exist: $SourcePath"
}
if (-not (Test-Path -LiteralPath $PalettePath -PathType Leaf)) {
    throw "Palette JSON does not exist: $PalettePath"
}
if ([System.IO.Path]::GetFullPath($SourcePath) -eq [System.IO.Path]::GetFullPath($OutputPath)) {
    throw 'Source and output paths must differ.'
}
if (Test-Path -LiteralPath $OutputPath) {
    throw "Output already exists: $OutputPath"
}
$sourceHashBefore = (Get-FileHash -Algorithm SHA256 -LiteralPath $SourcePath).Hash

$palette = Get-Content -Raw -Encoding UTF8 -LiteralPath $PalettePath | ConvertFrom-Json
$colorObject = Get-OptionalProperty -Object $palette -Name 'colors'
if ($null -eq $colorObject) {
    throw 'Palette JSON must define a colors object.'
}

$colors = @{}
foreach ($property in $colorObject.PSObject.Properties) {
    $value = ([string]$property.Value).Trim().TrimStart('#').ToUpperInvariant()
    if ($value -notmatch '^[0-9A-F]{6}$') {
        throw "Palette color '$($property.Name)' is not six-digit RGB: $value"
    }
    $colors[$property.Name] = $value
}
if (-not $colors.ContainsKey('primary')) {
    throw 'Palette JSON must define colors.primary.'
}

# Resolve a palette key to its validated RGB value.
function Resolve-Color {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Key
    )

    if (-not $colors.ContainsKey($Key)) {
        throw "Palette key is not defined: $Key"
    }
    return [string]$colors[$Key]
}

$document = Read-ZipXml -Path $SourcePath -EntryName 'word/document.xml'
$styles = Read-ZipXml -Path $SourcePath -EntryName 'word/styles.xml'

$documentNs = [System.Xml.XmlNamespaceManager]::new($document.NameTable)
[void]$documentNs.AddNamespace('w', $wNamespace)
$stylesNs = [System.Xml.XmlNamespaceManager]::new($styles.NameTable)
[void]$stylesNs.AddNamespace('w', $wNamespace)

$styleOutlineLevels = @{}
foreach ($style in $styles.SelectNodes('//w:style', $stylesNs)) {
    $styleId = $style.GetAttribute('styleId', $wNamespace)
    $outline = $style.SelectSingleNode('./w:pPr/w:outlineLvl', $stylesNs)
    if (-not [string]::IsNullOrWhiteSpace($styleId) -and $null -ne $outline) {
        $styleOutlineLevels[$styleId] = $outline.GetAttribute('val', $wNamespace)
    }
}

$body = $document.SelectSingleNode('/w:document/w:body', $documentNs)
$paragraphs = @($body.SelectNodes('./w:p', $documentNs))
$primary = Resolve-Color -Key 'primary'

$headingColors = Get-OptionalProperty -Object $palette -Name 'headingColors'
$coverRules = @(Get-OptionalProperty -Object $palette -Name 'coverRules')
$calloutConfig = Get-OptionalProperty -Object $palette -Name 'callouts'
$statuses = @(Get-OptionalProperty -Object $palette -Name 'statuses')

$headingRuns = 0
$boldRuns = 0
$hyperlinkRuns = 0
$coverRuns = 0
$callouts = 0
$genericBullets = 0
$statusBullets = 0

if ($ColorBoldTerms) {
    foreach ($paragraph in $paragraphs) {
        foreach ($run in $paragraph.SelectNodes('.//w:r[w:t]', $documentNs)) {
            $bold = $run.SelectSingleNode('./w:rPr/w:b', $documentNs)
            $boldComplex = $run.SelectSingleNode('./w:rPr/w:bCs', $documentNs)
            if ((Test-WOn -Element $bold) -or (Test-WOn -Element $boldComplex)) {
                Set-RunColor -Run $run -Color $primary -NamespaceManager $documentNs
                $boldRuns++
            }
        }
    }
}

if ($ColorHyperlinks) {
    foreach ($paragraph in $paragraphs) {
        foreach ($run in $paragraph.SelectNodes('.//w:hyperlink//w:r[w:t]', $documentNs)) {
            Set-RunColor -Run $run -Color $primary -NamespaceManager $documentNs
            $hyperlinkRuns++
        }
    }
}

foreach ($paragraph in $paragraphs) {
    $level = $null
    $outline = $paragraph.SelectSingleNode('./w:pPr/w:outlineLvl', $documentNs)
    if ($null -ne $outline) {
        $level = $outline.GetAttribute('val', $wNamespace)
    }
    else {
        $styleNode = $paragraph.SelectSingleNode('./w:pPr/w:pStyle', $documentNs)
        if ($null -ne $styleNode) {
            $styleId = $styleNode.GetAttribute('val', $wNamespace)
            if ($styleOutlineLevels.ContainsKey($styleId)) {
                $level = [string]$styleOutlineLevels[$styleId]
            }
        }
    }

    if ($null -eq $level) {
        continue
    }

    $colorKey = if ($null -ne $headingColors -and $null -ne $headingColors.PSObject.Properties[$level]) {
        [string]$headingColors.PSObject.Properties[$level].Value
    }
    elseif ($level -eq '0') {
        'primary'
    }
    elseif ($level -eq '1' -and $colors.ContainsKey('secondary')) {
        'secondary'
    }
    elseif ($colors.ContainsKey('muted')) {
        'muted'
    }
    else {
        'primary'
    }

    $headingRuns += Set-ParagraphColor `
        -Paragraph $paragraph `
        -Color (Resolve-Color -Key $colorKey) `
        -NamespaceManager $documentNs
}

$firstTopLevelHeading = $paragraphs.Count
for ($paragraphIndex = 0; $paragraphIndex -lt $paragraphs.Count; $paragraphIndex++) {
    $paragraph = $paragraphs[$paragraphIndex]
    $level = $null
    $outline = $paragraph.SelectSingleNode('./w:pPr/w:outlineLvl', $documentNs)
    if ($null -ne $outline) {
        $level = $outline.GetAttribute('val', $wNamespace)
    }
    else {
        $styleNode = $paragraph.SelectSingleNode('./w:pPr/w:pStyle', $documentNs)
        if ($null -ne $styleNode) {
            $styleId = $styleNode.GetAttribute('val', $wNamespace)
            if ($styleOutlineLevels.ContainsKey($styleId)) {
                $level = [string]$styleOutlineLevels[$styleId]
            }
        }
    }
    if ($level -eq '0') {
        $firstTopLevelHeading = $paragraphIndex
        break
    }
}

if ($coverRules.Count -gt 0) {
    for ($paragraphIndex = 0; $paragraphIndex -lt $firstTopLevelHeading; $paragraphIndex++) {
        $paragraph = $paragraphs[$paragraphIndex]
        $text = Get-ParagraphText -Paragraph $paragraph -NamespaceManager $documentNs
        if ([string]::IsNullOrEmpty($text)) {
            continue
        }

        foreach ($rule in $coverRules) {
            if ($null -eq $rule) { continue }
            $ruleText = [string](Get-OptionalProperty -Object $rule -Name 'text')
            $mode = [string](Get-OptionalProperty -Object $rule -Name 'mode')
            $colorKey = [string](Get-OptionalProperty -Object $rule -Name 'color')
            if ([string]::IsNullOrEmpty($ruleText) -or [string]::IsNullOrEmpty($colorKey)) {
                throw 'Each cover rule must define text and color.'
            }

            $matches = if ($mode -eq 'contains') {
                $text.IndexOf($ruleText, [System.StringComparison]::OrdinalIgnoreCase) -ge 0
            }
            else {
                $text.Equals($ruleText, [System.StringComparison]::OrdinalIgnoreCase)
            }

            if ($matches) {
                $coverRuns += Set-ParagraphColor `
                    -Paragraph $paragraph `
                    -Color (Resolve-Color -Key $colorKey) `
                    -NamespaceManager $documentNs
                break
            }
        }
    }
}

if ($null -ne $calloutConfig) {
    $fillKey = [string](Get-OptionalProperty -Object $calloutConfig -Name 'fill')
    $defaultBorderKey = [string](Get-OptionalProperty -Object $calloutConfig -Name 'defaultBorder')
    if ([string]::IsNullOrEmpty($fillKey)) { $fillKey = 'surface' }
    if ([string]::IsNullOrEmpty($defaultBorderKey)) { $defaultBorderKey = 'primary' }
    $legacyMap = Get-OptionalProperty -Object $calloutConfig -Name 'legacyBorderByFill'
    $prefixRules = @(Get-OptionalProperty -Object $calloutConfig -Name 'prefixBorderRules')

    foreach ($paragraph in $paragraphs) {
        $shading = $paragraph.SelectSingleNode('./w:pPr/w:shd', $documentNs)
        $borderNodes = @($paragraph.SelectNodes('./w:pPr/w:pBdr/*', $documentNs))
        if ($null -eq $shading -or $borderNodes.Count -eq 0) {
            continue
        }

        $text = Get-ParagraphText -Paragraph $paragraph -NamespaceManager $documentNs
        $legacyFill = $shading.GetAttribute('fill', $wNamespace).ToUpperInvariant()
        $borderKey = $defaultBorderKey
        if ($null -ne $legacyMap -and $null -ne $legacyMap.PSObject.Properties[$legacyFill]) {
            $borderKey = [string]$legacyMap.PSObject.Properties[$legacyFill].Value
        }

        foreach ($rule in $prefixRules) {
            if ($null -eq $rule) { continue }
            $prefix = [string](Get-OptionalProperty -Object $rule -Name 'prefix')
            $candidateKey = [string](Get-OptionalProperty -Object $rule -Name 'color')
            if (-not [string]::IsNullOrEmpty($prefix) -and
                $text.StartsWith($prefix, [System.StringComparison]::OrdinalIgnoreCase)) {
                $borderKey = $candidateKey
                break
            }
        }

        $changed = Set-CalloutAppearance `
            -Paragraph $paragraph `
            -BorderColor (Resolve-Color -Key $borderKey) `
            -FillColor (Resolve-Color -Key $fillKey) `
            -NamespaceManager $documentNs
        if ($changed) { $callouts++ }
    }
}

if ($ColorLiteralBullets) {
    foreach ($paragraph in $paragraphs) {
        $text = Get-ParagraphText -Paragraph $paragraph -NamespaceManager $documentNs
        if (-not $text.StartsWith($bulletCharacter)) {
            continue
        }

        $bulletRun = $null
        foreach ($run in $paragraph.SelectNodes('.//w:r[w:t]', $documentNs)) {
            $runText = (($run.SelectNodes('.//w:t', $documentNs) | ForEach-Object { $_.InnerText }) -join '')
            if ($runText.StartsWith($bulletCharacter)) {
                $bulletRun = $run
                break
            }
        }
        if ($null -eq $bulletRun) {
            continue
        }

        $statusColor = $null
        foreach ($status in $statuses) {
            if ($null -eq $status) { continue }
            $label = [string](Get-OptionalProperty -Object $status -Name 'label')
            $colorKey = [string](Get-OptionalProperty -Object $status -Name 'color')
            if (-not [string]::IsNullOrEmpty($label) -and
                $text.StartsWith($bulletCharacter + ' ' + $label, [System.StringComparison]::OrdinalIgnoreCase)) {
                $statusColor = Resolve-Color -Key $colorKey
                break
            }
        }

        if ($null -ne $statusColor) {
            Set-RunColor -Run $bulletRun -Color $statusColor -NamespaceManager $documentNs
            $statusBullets++
        }
        else {
            Set-RunColor -Run $bulletRun -Color $primary -NamespaceManager $documentNs
            $genericBullets++
        }
    }
}

Copy-Item -LiteralPath $SourcePath -Destination $OutputPath
Replace-ZipEntry -Path $OutputPath -EntryName 'word/document.xml' -Content $document.OuterXml
$sourceHashAfter = (Get-FileHash -Algorithm SHA256 -LiteralPath $SourcePath).Hash
if ($sourceHashBefore -ne $sourceHashAfter) {
    throw 'The source DOCX changed during branding.'
}

[pscustomobject]@{
    SourcePath       = [System.IO.Path]::GetFullPath($SourcePath)
    OutputPath       = [System.IO.Path]::GetFullPath($OutputPath)
    Palette          = [string](Get-OptionalProperty -Object $palette -Name 'name')
    SourceHash       = $sourceHashAfter
    OutputHash       = (Get-FileHash -Algorithm SHA256 -LiteralPath $OutputPath).Hash
    TargetedPart     = 'word/document.xml'
    DirectParagraphs = $paragraphs.Count
    HeadingRuns      = $headingRuns
    BoldRuns         = $boldRuns
    HyperlinkRuns    = $hyperlinkRuns
    CoverRuns        = $coverRuns
    Callouts         = $callouts
    GenericBullets   = $genericBullets
    StatusBullets    = $statusBullets
}
