[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$SpecPath,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$OutputPath
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# Return a property value without failing when an optional property is absent.
function Get-PropertyValue {
    param(
        [object]$Object,
        [string]$Name,
        [object]$Default = $null
    )

    if ($null -ne $Object -and $null -ne $Object.PSObject.Properties[$Name]) {
        return $Object.PSObject.Properties[$Name].Value
    }

    return $Default
}

# Report whether an object declares a property, including a property set to null.
function Test-ObjectProperty {
    param(
        [object]$Object,
        [string]$Name
    )

    return ($null -ne $Object -and $null -ne $Object.PSObject.Properties[$Name])
}

# Read a strict JSON boolean so string values cannot silently change behavior.
function Get-BooleanValue {
    param(
        [object]$Object,
        [string]$Name,
        [bool]$Default
    )

    if (-not (Test-ObjectProperty -Object $Object -Name $Name)) {
        return $Default
    }

    $value = Get-PropertyValue -Object $Object -Name $Name
    if ($value -isnot [bool]) {
        throw "Property '$Name' must be true or false."
    }

    return [bool]$value
}

# Remove invalid XML control characters and escape the remaining text.
function ConvertTo-XmlText {
    param([AllowNull()][object]$Value)

    if ($null -eq $Value) {
        return ''
    }

    $clean = [regex]::Replace([string]$Value, '[\x00-\x08\x0B\x0C\x0E-\x1F]', '')
    return [System.Security.SecurityElement]::Escape($clean)
}

# Validate and normalize a six-digit RGB value.
function ConvertTo-RgbHex {
    param(
        [object]$Value,
        [string]$Context
    )

    $text = [string]$Value
    if ($text -notmatch '^[0-9A-Fa-f]{6}$') {
        throw "$Context must be a six-digit RGB value without '#'. Received '$text'."
    }

    return $text.ToUpperInvariant()
}

# Build the effective palette from the IND defaults and optional overrides.
function New-EffectivePalette {
    param([object]$PaletteObject)

    $palette = @{
        primary         = '00296B'
        deep            = '001F4D'
        secondary       = '244C82'
        body            = '1F437D'
        surface         = 'F8FAFC'
        readonlySurface = 'F1F5F9'
        pageBackground  = 'F5F6F7'
        border          = 'E2E8F0'
        strongDivider   = 'CBD5E1'
        muted           = '64748B'
        draft           = '94A3B8'
        requested       = 'F59E0B'
        approved        = '22C55E'
        rejected        = 'EF4444'
        paid            = '00296B'
        white           = 'FFFFFF'
    }
    $overrides = @{}

    if ($null -ne $PaletteObject) {
        if ($PaletteObject -isnot [pscustomobject] -and $PaletteObject -isnot [hashtable]) {
            throw 'Property palette must be a JSON object.'
        }

        foreach ($property in $PaletteObject.PSObject.Properties) {
            $name = [string]$property.Name
            if ([string]::IsNullOrWhiteSpace($name)) {
                throw 'Palette token names cannot be empty.'
            }

            $palette[$name] = ConvertTo-RgbHex -Value $property.Value -Context "Palette color '$name'"
            $overrides[$name] = $true
        }
    }

    if ($overrides.ContainsKey('primaryDark') -and -not $overrides.ContainsKey('deep')) {
        $palette.deep = $palette.primaryDark
    }
    if ($overrides.ContainsKey('deep') -and -not $overrides.ContainsKey('primaryDark')) {
        $palette.primaryDark = $palette.deep
    }
    if (-not $palette.ContainsKey('primaryDark')) {
        $palette.primaryDark = $palette.deep
    }

    if ($overrides.ContainsKey('text') -and -not $overrides.ContainsKey('body')) {
        $palette.body = $palette.text
    }
    if ($overrides.ContainsKey('body') -and -not $overrides.ContainsKey('text')) {
        $palette.text = $palette.body
    }
    if (-not $palette.ContainsKey('text')) {
        $palette.text = $palette.body
    }

    if ($overrides.ContainsKey('warning') -and -not $overrides.ContainsKey('requested')) {
        $palette.requested = $palette.warning
    }
    if ($overrides.ContainsKey('requested') -and -not $overrides.ContainsKey('warning')) {
        $palette.warning = $palette.requested
    }
    if (-not $palette.ContainsKey('warning')) {
        $palette.warning = $palette.requested
    }

    if ($overrides.ContainsKey('success') -and -not $overrides.ContainsKey('approved')) {
        $palette.approved = $palette.success
    }
    if ($overrides.ContainsKey('approved') -and -not $overrides.ContainsKey('success')) {
        $palette.success = $palette.approved
    }
    if (-not $palette.ContainsKey('success')) {
        $palette.success = $palette.approved
    }

    if ($overrides.ContainsKey('danger') -and -not $overrides.ContainsKey('rejected')) {
        $palette.rejected = $palette.danger
    }
    if ($overrides.ContainsKey('rejected') -and -not $overrides.ContainsKey('danger')) {
        $palette.danger = $palette.rejected
    }
    if (-not $palette.ContainsKey('danger')) {
        $palette.danger = $palette.rejected
    }

    return $palette
}

# Resolve a palette token or direct RGB value to a normalized color.
function Resolve-Color {
    param(
        [AllowNull()][object]$Value,
        [hashtable]$Palette,
        [AllowNull()][string]$FallbackToken = $null
    )

    if ($null -eq $Value -or [string]::IsNullOrWhiteSpace([string]$Value)) {
        if ([string]::IsNullOrWhiteSpace($FallbackToken)) {
            return $null
        }
        return [string]$Palette[$FallbackToken]
    }

    $text = [string]$Value
    if ($Palette.ContainsKey($text)) {
        return [string]$Palette[$text]
    }

    return ConvertTo-RgbHex -Value $text -Context 'Run color'
}

# Validate a required or optional text value.
function Get-TextValue {
    param(
        [object]$Object,
        [string]$Name,
        [bool]$Required = $false,
        [string]$Default = ''
    )

    $value = Get-PropertyValue -Object $Object -Name $Name -Default $Default
    if ($null -eq $value) {
        $value = $Default
    }
    if ($value -isnot [string]) {
        throw "Property '$Name' must be a string."
    }
    if ($Required -and [string]::IsNullOrWhiteSpace([string]$value)) {
        throw "Property '$Name' is required and cannot be empty."
    }

    return [string]$value
}

# Convert one text run to safe WordprocessingML.
function New-RunXml {
    param(
        [object]$Run,
        [hashtable]$Palette,
        [AllowNull()][string]$DefaultColor = $null,
        [bool]$DefaultBold = $false,
        [bool]$DefaultItalic = $false
    )

    if ($Run -is [string]) {
        $text = [string]$Run
        $bold = $DefaultBold
        $italic = $DefaultItalic
        $color = $DefaultColor
    }
    else {
        if ($null -eq $Run) {
            throw 'A text run cannot be null.'
        }

        $text = Get-TextValue -Object $Run -Name 'text' -Required $true
        $bold = Get-BooleanValue -Object $Run -Name 'bold' -Default $DefaultBold
        $italic = Get-BooleanValue -Object $Run -Name 'italic' -Default $DefaultItalic
        $runColor = Get-PropertyValue -Object $Run -Name 'color'
        if ($null -ne $runColor) {
            $color = Resolve-Color -Value $runColor -Palette $Palette
        }
        else {
            $color = $DefaultColor
        }
    }

    $properties = New-Object System.Collections.Generic.List[string]
    if ($bold) {
        $properties.Add('<w:b/>')
    }
    if ($italic) {
        $properties.Add('<w:i/>')
    }
    if (-not [string]::IsNullOrWhiteSpace($color)) {
        $properties.Add('<w:color w:val="' + (ConvertTo-XmlText $color) + '"/>')
    }

    $builder = New-Object System.Text.StringBuilder
    [void]$builder.Append('<w:r>')
    if ($properties.Count -gt 0) {
        [void]$builder.Append('<w:rPr>')
        foreach ($property in $properties) {
            [void]$builder.Append($property)
        }
        [void]$builder.Append('</w:rPr>')
    }

    $segments = [regex]::Split($text, "`r`n|`n|`r")
    for ($index = 0; $index -lt $segments.Count; $index++) {
        if ($index -gt 0) {
            [void]$builder.Append('<w:br/>')
        }
        [void]$builder.Append('<w:t xml:space="preserve">')
        [void]$builder.Append((ConvertTo-XmlText $segments[$index]))
        [void]$builder.Append('</w:t>')
    }

    [void]$builder.Append('</w:r>')
    return $builder.ToString()
}

# Build all runs declared by a paragraph-like block.
function New-BlockRunsXml {
    param(
        [object]$Block,
        [hashtable]$Palette,
        [AllowNull()][string]$DefaultColor = $null,
        [bool]$DefaultBold = $false,
        [bool]$DefaultItalic = $false
    )

    $builder = New-Object System.Text.StringBuilder
    if (Test-ObjectProperty -Object $Block -Name 'runs') {
        $runs = @(Get-PropertyValue -Object $Block -Name 'runs')
        if ($runs.Count -eq 0) {
            throw 'Property runs must contain at least one text run.'
        }

        foreach ($run in $runs) {
            [void]$builder.Append((New-RunXml -Run $run -Palette $Palette -DefaultColor $DefaultColor -DefaultBold $DefaultBold -DefaultItalic $DefaultItalic))
        }
    }
    elseif (Test-ObjectProperty -Object $Block -Name 'text') {
        $text = Get-TextValue -Object $Block -Name 'text' -Required $false
        [void]$builder.Append((New-RunXml -Run $text -Palette $Palette -DefaultColor $DefaultColor -DefaultBold $DefaultBold -DefaultItalic $DefaultItalic))
    }
    else {
        throw "Block type '$((Get-PropertyValue -Object $Block -Name 'type' -Default 'unknown'))' requires text or runs."
    }

    return $builder.ToString()
}

# Build a normal styled paragraph from a content block.
function New-ParagraphXml {
    param(
        [object]$Block,
        [hashtable]$Palette,
        [string]$StyleId = 'Normal',
        [AllowNull()][string]$ExtraPropertiesXml = $null,
        [AllowNull()][string]$DefaultColor = $null,
        [bool]$DefaultBold = $false,
        [bool]$DefaultItalic = $false
    )

    $alignment = [string](Get-PropertyValue -Object $Block -Name 'align' -Default '')
    if (-not [string]::IsNullOrWhiteSpace($alignment)) {
        $allowed = @('left', 'center', 'right', 'justify')
        if ($allowed -notcontains $alignment) {
            throw "Paragraph alignment '$alignment' is not supported."
        }
    }

    $builder = New-Object System.Text.StringBuilder
    [void]$builder.Append('<w:p><w:pPr><w:pStyle w:val="')
    [void]$builder.Append((ConvertTo-XmlText $StyleId))
    [void]$builder.Append('"/>')
    if (-not [string]::IsNullOrWhiteSpace($alignment)) {
        [void]$builder.Append('<w:jc w:val="' + (ConvertTo-XmlText $alignment) + '"/>')
    }
    if (-not [string]::IsNullOrWhiteSpace($ExtraPropertiesXml)) {
        [void]$builder.Append($ExtraPropertiesXml)
    }
    [void]$builder.Append('</w:pPr>')
    [void]$builder.Append((New-BlockRunsXml -Block $Block -Palette $Palette -DefaultColor $DefaultColor -DefaultBold $DefaultBold -DefaultItalic $DefaultItalic))
    [void]$builder.Append('</w:p>')
    return $builder.ToString()
}

# Add one real OOXML list instance and return its numbering identifier.
function Add-NumberingInstance {
    param(
        [hashtable]$State,
        [ValidateSet('bullet', 'numbered')]
        [string]$Style
    )

    $numId = [int]$State.NextNumId
    $abstractId = 1
    if ($Style -eq 'numbered') {
        $abstractId = 2
    }

    $State.Numbering.Add([pscustomobject]@{
            NumId      = $numId
            AbstractId = $abstractId
        })
    $State.NextNumId = $numId + 1
    return $numId
}

# Build a bullet or numbered list using native Word numbering.
function New-ListXml {
    param(
        [object]$Block,
        [hashtable]$Palette,
        [hashtable]$State,
        [ValidateSet('bullet', 'numbered')]
        [string]$Style
    )

    $items = @(Get-PropertyValue -Object $Block -Name 'items')
    if ($items.Count -eq 0) {
        throw "A $Style list must contain at least one item."
    }

    $numId = Add-NumberingInstance -State $State -Style $Style
    $builder = New-Object System.Text.StringBuilder
    foreach ($item in $items) {
        if ($item -is [string]) {
            $itemBlock = [pscustomobject]@{ text = [string]$item }
            $level = 0
        }
        else {
            if ($null -eq $item) {
                throw 'List items cannot be null.'
            }
            $itemBlock = $item
            $levelValue = Get-PropertyValue -Object $item -Name 'level' -Default 0
            if ($levelValue -isnot [int] -and $levelValue -isnot [long]) {
                throw 'List item level must be an integer from 0 to 2.'
            }
            $level = [int]$levelValue
            if ($level -lt 0 -or $level -gt 2) {
                throw 'List item level must be an integer from 0 to 2.'
            }
        }

        $numProperties = '<w:numPr><w:ilvl w:val="' + $level + '"/><w:numId w:val="' + $numId + '"/></w:numPr>'
        [void]$builder.Append((New-ParagraphXml -Block $itemBlock -Palette $Palette -StyleId 'ListParagraph' -ExtraPropertiesXml $numProperties))
    }

    return $builder.ToString()
}

# Map a callout kind to a semantic palette color.
function Get-CalloutColor {
    param(
        [string]$Kind,
        [hashtable]$Palette,
        [object]$Block
    )

    $explicit = Get-PropertyValue -Object $Block -Name 'color'
    if ($null -ne $explicit) {
        return Resolve-Color -Value $explicit -Palette $Palette
    }

    switch ($Kind.ToLowerInvariant()) {
        'warning' { return $Palette.requested }
        'requested' { return $Palette.requested }
        'success' { return $Palette.approved }
        'approved' { return $Palette.approved }
        'danger' { return $Palette.rejected }
        'error' { return $Palette.rejected }
        'security' { return $Palette.rejected }
        'rejected' { return $Palette.rejected }
        'neutral' { return $Palette.muted }
        default { return $Palette.primary }
    }
}

# Build a semantic callout as a padded one-cell table.
function New-CalloutXml {
    param(
        [object]$Block,
        [hashtable]$Palette
    )

    $kind = [string](Get-PropertyValue -Object $Block -Name 'kind' -Default 'info')
    $supportedKinds = @('info', 'navigation', 'warning', 'requested', 'success', 'approved', 'danger', 'error', 'security', 'rejected', 'neutral')
    if ($supportedKinds -notcontains $kind.ToLowerInvariant()) {
        throw "Callout kind '$kind' is not supported."
    }

    $color = Get-CalloutColor -Kind $kind -Palette $Palette -Block $Block
    $defaultTitles = @{
        info       = 'Information'
        navigation = 'Navigation'
        warning    = 'Important'
        requested  = 'Important'
        success    = 'Expected result'
        approved   = 'Expected result'
        danger     = 'Attention'
        error      = 'Error'
        security   = 'Security'
        rejected   = 'Attention'
        neutral    = 'Note'
    }
    $title = Get-TextValue -Object $Block -Name 'title' -Default $defaultTitles[$kind.ToLowerInvariant()]

    if (-not (Test-ObjectProperty -Object $Block -Name 'text') -and -not (Test-ObjectProperty -Object $Block -Name 'runs')) {
        throw 'A callout requires text or runs.'
    }

    $titleBlock = [pscustomobject]@{ text = $title }
    $builder = New-Object System.Text.StringBuilder
    [void]$builder.Append('<w:tbl><w:tblPr>')
    [void]$builder.Append('<w:tblW w:w="9072" w:type="dxa"/>')
    [void]$builder.Append('<w:tblInd w:w="0" w:type="dxa"/>')
    [void]$builder.Append('<w:tblBorders>')
    [void]$builder.Append('<w:top w:val="single" w:sz="4" w:space="0" w:color="' + $Palette.border + '"/>')
    [void]$builder.Append('<w:left w:val="single" w:sz="18" w:space="0" w:color="' + $color + '"/>')
    [void]$builder.Append('<w:bottom w:val="single" w:sz="4" w:space="0" w:color="' + $Palette.border + '"/>')
    [void]$builder.Append('<w:right w:val="single" w:sz="4" w:space="0" w:color="' + $Palette.border + '"/>')
    [void]$builder.Append('<w:insideH w:val="nil"/><w:insideV w:val="nil"/>')
    [void]$builder.Append('</w:tblBorders>')
    [void]$builder.Append('<w:tblCellMar><w:top w:w="100" w:type="dxa"/><w:left w:w="160" w:type="dxa"/><w:bottom w:w="100" w:type="dxa"/><w:right w:w="160" w:type="dxa"/></w:tblCellMar>')
    [void]$builder.Append('</w:tblPr><w:tblGrid><w:gridCol w:w="9072"/></w:tblGrid><w:tr><w:tc>')
    [void]$builder.Append('<w:tcPr><w:tcW w:w="9072" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="' + $Palette.surface + '"/></w:tcPr>')
    [void]$builder.Append((New-ParagraphXml -Block $titleBlock -Palette $Palette -StyleId 'CalloutTitle' -DefaultColor $color -DefaultBold $true))
    [void]$builder.Append((New-ParagraphXml -Block $Block -Palette $Palette -StyleId 'CalloutBody'))
    [void]$builder.Append('</w:tc></w:tr></w:tbl>')
    return $builder.ToString()
}

# Append an optional labeled line to a screenshot placeholder.
function Add-PlaceholderDetailXml {
    param(
        [System.Text.StringBuilder]$Builder,
        [object]$Block,
        [string]$PropertyName,
        [string]$Label,
        [hashtable]$Palette
    )

    if (-not (Test-ObjectProperty -Object $Block -Name $PropertyName)) {
        return
    }

    $value = Get-TextValue -Object $Block -Name $PropertyName
    if ([string]::IsNullOrWhiteSpace($value)) {
        return
    }

    $detail = [pscustomobject]@{
        runs = @(
            [pscustomobject]@{ text = $Label; bold = $true; color = 'primary' },
            [pscustomobject]@{ text = $value }
        )
        align = 'center'
    }
    [void]$Builder.Append((New-ParagraphXml -Block $detail -Palette $Palette -StyleId 'PlaceholderText'))
}

# Build a visible frame that reserves space for a future screenshot.
function New-ScreenshotPlaceholderXml {
    param(
        [object]$Block,
        [hashtable]$Palette
    )

    $heightValue = Get-PropertyValue -Object $Block -Name 'heightTwips' -Default 2200
    if ($heightValue -isnot [int] -and $heightValue -isnot [long]) {
        throw 'Screenshot placeholder heightTwips must be an integer.'
    }
    $height = [int]$heightValue
    if ($height -lt 900 -or $height -gt 9000) {
        throw 'Screenshot placeholder heightTwips must be between 900 and 9000.'
    }

    $id = Get-TextValue -Object $Block -Name 'id' -Default ''
    $label = Get-TextValue -Object $Block -Name 'label' -Default 'IMAGE PLACEHOLDER'
    if (-not [string]::IsNullOrWhiteSpace($id)) {
        $label = $label + ' - ' + $id
    }

    $labelBlock = [pscustomobject]@{ text = $label; align = 'center' }
    $builder = New-Object System.Text.StringBuilder
    [void]$builder.Append('<w:tbl><w:tblPr>')
    [void]$builder.Append('<w:tblW w:w="9072" w:type="dxa"/>')
    [void]$builder.Append('<w:tblBorders>')
    foreach ($side in @('top', 'left', 'bottom', 'right')) {
        [void]$builder.Append('<w:' + $side + ' w:val="dashSmallGap" w:sz="8" w:space="0" w:color="' + $Palette.primary + '"/>')
    }
    [void]$builder.Append('<w:insideH w:val="nil"/><w:insideV w:val="nil"/>')
    [void]$builder.Append('</w:tblBorders>')
    [void]$builder.Append('<w:tblCellMar><w:top w:w="140" w:type="dxa"/><w:left w:w="180" w:type="dxa"/><w:bottom w:w="140" w:type="dxa"/><w:right w:w="180" w:type="dxa"/></w:tblCellMar>')
    [void]$builder.Append('</w:tblPr><w:tblGrid><w:gridCol w:w="9072"/></w:tblGrid><w:tr>')
    [void]$builder.Append('<w:trPr><w:trHeight w:val="' + $height + '" w:hRule="atLeast"/></w:trPr><w:tc>')
    [void]$builder.Append('<w:tcPr><w:tcW w:w="9072" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="' + $Palette.surface + '"/><w:vAlign w:val="center"/></w:tcPr>')
    [void]$builder.Append((New-ParagraphXml -Block $labelBlock -Palette $Palette -StyleId 'PlaceholderTitle' -DefaultColor $Palette.primary -DefaultBold $true))

    if (Test-ObjectProperty -Object $Block -Name 'description') {
        $description = Get-TextValue -Object $Block -Name 'description'
        if (-not [string]::IsNullOrWhiteSpace($description)) {
            $descriptionBlock = [pscustomobject]@{ text = $description; align = 'center' }
            [void]$builder.Append((New-ParagraphXml -Block $descriptionBlock -Palette $Palette -StyleId 'PlaceholderText'))
        }
    }
    elseif (Test-ObjectProperty -Object $Block -Name 'text') {
        $description = Get-TextValue -Object $Block -Name 'text'
        if (-not [string]::IsNullOrWhiteSpace($description)) {
            $descriptionBlock = [pscustomobject]@{ text = $description; align = 'center' }
            [void]$builder.Append((New-ParagraphXml -Block $descriptionBlock -Palette $Palette -StyleId 'PlaceholderText'))
        }
    }

    Add-PlaceholderDetailXml -Builder $builder -Block $Block -PropertyName 'purpose' -Label 'Purpose: ' -Palette $Palette
    Add-PlaceholderDetailXml -Builder $builder -Block $Block -PropertyName 'screenState' -Label 'Required state: ' -Palette $Palette
    Add-PlaceholderDetailXml -Builder $builder -Block $Block -PropertyName 'safeDataRule' -Label 'Safe data: ' -Palette $Palette
    Add-PlaceholderDetailXml -Builder $builder -Block $Block -PropertyName 'altText' -Label 'Alternative text: ' -Palette $Palette

    [void]$builder.Append('</w:tc></w:tr></w:tbl>')

    if (Test-ObjectProperty -Object $Block -Name 'caption') {
        $caption = Get-TextValue -Object $Block -Name 'caption'
        if (-not [string]::IsNullOrWhiteSpace($caption)) {
            $captionBlock = [pscustomobject]@{ text = $caption; align = 'center' }
            [void]$builder.Append((New-ParagraphXml -Block $captionBlock -Palette $Palette -StyleId 'Caption'))
        }
    }

    return $builder.ToString()
}

# Build the branded cover and its section break.
function New-CoverXml {
    param(
        [object]$Cover,
        [hashtable]$Palette
    )

    $title = Get-TextValue -Object $Cover -Name 'title' -Required $true
    $builder = New-Object System.Text.StringBuilder

    foreach ($field in @(
            @{ Name = 'organization'; Style = 'CoverOrganization' },
            @{ Name = 'product'; Style = 'CoverOrganization' },
            @{ Name = 'label'; Style = 'CoverLabel' }
        )) {
        if (Test-ObjectProperty -Object $Cover -Name $field.Name) {
            $value = Get-TextValue -Object $Cover -Name $field.Name
            if (-not [string]::IsNullOrWhiteSpace($value)) {
                $block = [pscustomobject]@{ text = $value }
                [void]$builder.Append((New-ParagraphXml -Block $block -Palette $Palette -StyleId $field.Style))
            }
        }
    }

    $titleBlock = [pscustomobject]@{ text = $title }
    [void]$builder.Append((New-ParagraphXml -Block $titleBlock -Palette $Palette -StyleId 'CoverTitle'))

    if (Test-ObjectProperty -Object $Cover -Name 'subtitle') {
        $subtitle = Get-TextValue -Object $Cover -Name 'subtitle'
        if (-not [string]::IsNullOrWhiteSpace($subtitle)) {
            $block = [pscustomobject]@{ text = $subtitle }
            [void]$builder.Append((New-ParagraphXml -Block $block -Palette $Palette -StyleId 'CoverSubtitle'))
        }
    }

    foreach ($field in @('version', 'owner', 'date')) {
        if (Test-ObjectProperty -Object $Cover -Name $field) {
            $value = Get-TextValue -Object $Cover -Name $field
            if (-not [string]::IsNullOrWhiteSpace($value)) {
                $block = [pscustomobject]@{ text = $value }
                [void]$builder.Append((New-ParagraphXml -Block $block -Palette $Palette -StyleId 'CoverMeta'))
            }
        }
    }

    [void]$builder.Append('<w:p><w:pPr><w:sectPr><w:type w:val="nextPage"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1417" w:right="1417" w:bottom="1417" w:left="1417" w:header="708" w:footer="708" w:gutter="0"/><w:cols w:space="708"/><w:docGrid w:linePitch="360"/></w:sectPr></w:pPr></w:p>')
    return $builder.ToString()
}

# Build a live Word TOC field that updates when the document opens.
function New-TableOfContentsXml {
    param(
        [string]$Title,
        [string]$Placeholder,
        [hashtable]$Palette
    )

    $titleBlock = [pscustomobject]@{ text = $Title }
    $builder = New-Object System.Text.StringBuilder
    [void]$builder.Append((New-ParagraphXml -Block $titleBlock -Palette $Palette -StyleId 'TOCHeading'))
    [void]$builder.Append('<w:p><w:r><w:fldChar w:fldCharType="begin" w:dirty="true"/></w:r>')
    [void]$builder.Append('<w:r><w:instrText xml:space="preserve"> TOC \o &quot;1-3&quot; \h \z \u </w:instrText></w:r>')
    [void]$builder.Append('<w:r><w:fldChar w:fldCharType="separate"/></w:r>')
    [void]$builder.Append((New-RunXml -Run $Placeholder -Palette $Palette -DefaultColor $Palette.muted -DefaultItalic $true))
    [void]$builder.Append('<w:r><w:fldChar w:fldCharType="end"/></w:r></w:p>')
    [void]$builder.Append('<w:p><w:r><w:br w:type="page"/></w:r></w:p>')
    return $builder.ToString()
}

# Build all authored body blocks and validate heading hierarchy.
function New-ContentXml {
    param(
        [object[]]$Blocks,
        [hashtable]$Palette,
        [hashtable]$State
    )

    $builder = New-Object System.Text.StringBuilder
    $lastHeadingLevel = 0
    $seenHeading = $false

    for ($index = 0; $index -lt $Blocks.Count; $index++) {
        $block = $Blocks[$index]
        if ($null -eq $block) {
            throw "Content block $index cannot be null."
        }

        $type = [string](Get-PropertyValue -Object $block -Name 'type' -Default '')
        if ([string]::IsNullOrWhiteSpace($type)) {
            throw "Content block $index requires a type."
        }

        switch ($type.ToLowerInvariant()) {
            'heading' {
                $levelValue = Get-PropertyValue -Object $block -Name 'level'
                if ($levelValue -isnot [int] -and $levelValue -isnot [long]) {
                    throw "Heading block $index requires an integer level from 1 to 3."
                }
                $level = [int]$levelValue
                if ($level -lt 1 -or $level -gt 3) {
                    throw "Heading block $index requires an integer level from 1 to 3."
                }
                if (-not $seenHeading -and $level -ne 1) {
                    throw "The first heading must use level 1. Block $index uses level $level."
                }
                if ($seenHeading -and $level -gt ($lastHeadingLevel + 1)) {
                    throw "Heading block $index skips from level $lastHeadingLevel to level $level."
                }
                [void]$builder.Append((New-ParagraphXml -Block $block -Palette $Palette -StyleId ('Heading' + $level)))
                $lastHeadingLevel = $level
                $seenHeading = $true
            }
            'paragraph' {
                [void]$builder.Append((New-ParagraphXml -Block $block -Palette $Palette))
            }
            'bulletlist' {
                [void]$builder.Append((New-ListXml -Block $block -Palette $Palette -State $State -Style 'bullet'))
            }
            'numberedlist' {
                [void]$builder.Append((New-ListXml -Block $block -Palette $Palette -State $State -Style 'numbered'))
            }
            'list' {
                $style = [string](Get-PropertyValue -Object $block -Name 'style' -Default '')
                if ($style -notin @('bullet', 'numbered')) {
                    throw "List block $index requires style 'bullet' or 'numbered'."
                }
                [void]$builder.Append((New-ListXml -Block $block -Palette $Palette -State $State -Style $style))
            }
            'callout' {
                [void]$builder.Append((New-CalloutXml -Block $block -Palette $Palette))
            }
            'screenshot' {
                [void]$builder.Append((New-ScreenshotPlaceholderXml -Block $block -Palette $Palette))
            }
            'screenshotplaceholder' {
                [void]$builder.Append((New-ScreenshotPlaceholderXml -Block $block -Palette $Palette))
            }
            'pagebreak' {
                [void]$builder.Append('<w:p><w:r><w:br w:type="page"/></w:r></w:p>')
            }
            default {
                throw "Content block $index has unsupported type '$type'."
            }
        }
    }

    return $builder.ToString()
}

# Build the final A4 section and optional page-number footer reference.
function New-FinalSectionXml {
    param(
        [bool]$PageNumbers,
        [bool]$RestartPageNumbers
    )

    $builder = New-Object System.Text.StringBuilder
    [void]$builder.Append('<w:sectPr>')
    if ($PageNumbers) {
        [void]$builder.Append('<w:footerReference w:type="default" r:id="rId4"/>')
    }
    [void]$builder.Append('<w:pgSz w:w="11906" w:h="16838"/>')
    [void]$builder.Append('<w:pgMar w:top="1417" w:right="1417" w:bottom="1417" w:left="1417" w:header="708" w:footer="708" w:gutter="0"/>')
    if ($RestartPageNumbers) {
        [void]$builder.Append('<w:pgNumType w:start="1"/>')
    }
    [void]$builder.Append('<w:cols w:space="708"/><w:docGrid w:linePitch="360"/></w:sectPr>')
    return $builder.ToString()
}

# Build the main Word document part.
function New-DocumentXml {
    param(
        [object]$Spec,
        [hashtable]$Palette,
        [hashtable]$State,
        [bool]$HasCover,
        [bool]$UseToc,
        [bool]$PageNumbers
    )

    $builder = New-Object System.Text.StringBuilder
    [void]$builder.Append('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>')
    [void]$builder.Append('<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>')

    if ($HasCover) {
        [void]$builder.Append((New-CoverXml -Cover (Get-PropertyValue -Object $Spec -Name 'cover') -Palette $Palette))
    }

    if ($UseToc) {
        $tocTitle = Get-TextValue -Object $Spec -Name 'tocTitle' -Default 'Contents'
        $tocPlaceholder = Get-TextValue -Object $Spec -Name 'tocPlaceholder' -Default 'Open this document in Microsoft Word and update the field to build the table of contents.'
        [void]$builder.Append((New-TableOfContentsXml -Title $tocTitle -Placeholder $tocPlaceholder -Palette $Palette))
    }

    $blocks = @()
    if (Test-ObjectProperty -Object $Spec -Name 'content') {
        $blocks = @(Get-PropertyValue -Object $Spec -Name 'content')
    }
    [void]$builder.Append((New-ContentXml -Blocks $blocks -Palette $Palette -State $State))
    [void]$builder.Append((New-FinalSectionXml -PageNumbers $PageNumbers -RestartPageNumbers $HasCover))
    [void]$builder.Append('</w:body></w:document>')
    return $builder.ToString()
}

# Build the Word style definitions for compact branded manuals.
function New-StylesXml {
    param(
        [hashtable]$Palette,
        [string]$FontFamily,
        [string]$Language
    )

    $font = ConvertTo-XmlText $FontFamily
    $lang = ConvertTo-XmlText $Language
    return @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault><w:rPr><w:rFonts w:ascii="$font" w:hAnsi="$font" w:eastAsia="$font" w:cs="$font"/><w:color w:val="$($Palette.body)"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:lang w:val="$lang"/></w:rPr></w:rPrDefault>
    <w:pPrDefault><w:pPr><w:spacing w:after="100" w:line="276" w:lineRule="auto"/><w:widowControl/></w:pPr></w:pPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:after="100" w:line="276" w:lineRule="auto"/><w:widowControl/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="CoverOrganization"><w:name w:val="Cover Organization"/><w:basedOn w:val="Normal"/><w:next w:val="CoverLabel"/><w:pPr><w:spacing w:before="160" w:after="80"/><w:jc w:val="left"/></w:pPr><w:rPr><w:b/><w:color w:val="$($Palette.primary)"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="CoverLabel"><w:name w:val="Cover Label"/><w:basedOn w:val="Normal"/><w:next w:val="CoverTitle"/><w:pPr><w:spacing w:before="80" w:after="2200"/></w:pPr><w:rPr><w:b/><w:color w:val="$($Palette.secondary)"/><w:sz w:val="20"/><w:szCs w:val="20"/><w:spacing w:val="20"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="CoverTitle"><w:name w:val="Cover Title"/><w:basedOn w:val="Normal"/><w:next w:val="CoverSubtitle"/><w:pPr><w:keepNext/><w:spacing w:before="400" w:after="180"/><w:shd w:val="clear" w:color="auto" w:fill="$($Palette.primary)"/><w:ind w:left="260" w:right="220"/></w:pPr><w:rPr><w:b/><w:color w:val="$($Palette.white)"/><w:sz w:val="42"/><w:szCs w:val="42"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="CoverSubtitle"><w:name w:val="Cover Subtitle"/><w:basedOn w:val="Normal"/><w:next w:val="CoverMeta"/><w:pPr><w:spacing w:before="120" w:after="700"/></w:pPr><w:rPr><w:color w:val="$($Palette.secondary)"/><w:sz w:val="27"/><w:szCs w:val="27"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="CoverMeta"><w:name w:val="Cover Metadata"/><w:basedOn w:val="Normal"/><w:next w:val="CoverMeta"/><w:pPr><w:spacing w:after="60"/></w:pPr><w:rPr><w:color w:val="$($Palette.muted)"/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:uiPriority w:val="9"/><w:qFormat/><w:pPr><w:keepNext/><w:keepLines/><w:spacing w:before="300" w:after="120"/><w:pBdr><w:bottom w:val="single" w:sz="8" w:space="4" w:color="$($Palette.strongDivider)"/></w:pBdr><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:color w:val="$($Palette.primary)"/><w:sz w:val="31"/><w:szCs w:val="31"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:uiPriority w:val="9"/><w:qFormat/><w:pPr><w:keepNext/><w:keepLines/><w:spacing w:before="240" w:after="100"/><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="4" w:color="$($Palette.border)"/></w:pBdr><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/><w:color w:val="$($Palette.secondary)"/><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:uiPriority w:val="9"/><w:qFormat/><w:pPr><w:keepNext/><w:keepLines/><w:spacing w:before="200" w:after="80"/><w:outlineLvl w:val="2"/></w:pPr><w:rPr><w:b/><w:color w:val="$($Palette.muted)"/><w:sz w:val="23"/><w:szCs w:val="23"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="ListParagraph"><w:name w:val="List Paragraph"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:after="70" w:line="276" w:lineRule="auto"/><w:contextualSpacing/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="CalloutTitle"><w:name w:val="Callout Title"/><w:basedOn w:val="Normal"/><w:next w:val="CalloutBody"/><w:pPr><w:keepNext/><w:spacing w:after="40"/></w:pPr><w:rPr><w:b/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="CalloutBody"><w:name w:val="Callout Body"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:spacing w:after="20" w:line="260" w:lineRule="auto"/></w:pPr><w:rPr><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="PlaceholderTitle"><w:name w:val="Placeholder Title"/><w:basedOn w:val="Normal"/><w:next w:val="PlaceholderText"/><w:pPr><w:spacing w:after="60"/><w:jc w:val="center"/></w:pPr><w:rPr><w:b/><w:color w:val="$($Palette.primary)"/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="PlaceholderText"><w:name w:val="Placeholder Text"/><w:basedOn w:val="Normal"/><w:next w:val="PlaceholderText"/><w:pPr><w:spacing w:after="40" w:line="240" w:lineRule="auto"/><w:jc w:val="center"/></w:pPr><w:rPr><w:color w:val="$($Palette.muted)"/><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Caption"><w:name w:val="caption"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:uiPriority w:val="35"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="50" w:after="120"/><w:jc w:val="center"/></w:pPr><w:rPr><w:i/><w:color w:val="$($Palette.muted)"/><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="TOCHeading"><w:name w:val="TOC Heading"/><w:basedOn w:val="Heading1"/><w:next w:val="Normal"/><w:uiPriority w:val="39"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="0" w:after="180"/><w:outlineLvl w:val="9"/></w:pPr><w:rPr><w:b/><w:color w:val="$($Palette.primary)"/><w:sz w:val="31"/><w:szCs w:val="31"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="TOC1"><w:name w:val="toc 1"/><w:basedOn w:val="Normal"/><w:autoRedefine/><w:next w:val="Normal"/><w:uiPriority w:val="39"/><w:unhideWhenUsed/><w:pPr><w:spacing w:after="60"/><w:tabs><w:tab w:val="right" w:leader="dot" w:pos="9072"/></w:tabs></w:pPr><w:rPr><w:b/><w:color w:val="$($Palette.primary)"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="TOC2"><w:name w:val="toc 2"/><w:basedOn w:val="Normal"/><w:autoRedefine/><w:next w:val="Normal"/><w:uiPriority w:val="39"/><w:unhideWhenUsed/><w:pPr><w:ind w:left="280"/><w:spacing w:after="40"/><w:tabs><w:tab w:val="right" w:leader="dot" w:pos="9072"/></w:tabs></w:pPr><w:rPr><w:color w:val="$($Palette.secondary)"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="TOC3"><w:name w:val="toc 3"/><w:basedOn w:val="Normal"/><w:autoRedefine/><w:next w:val="Normal"/><w:uiPriority w:val="39"/><w:unhideWhenUsed/><w:pPr><w:ind w:left="560"/><w:spacing w:after="30"/><w:tabs><w:tab w:val="right" w:leader="dot" w:pos="9072"/></w:tabs></w:pPr><w:rPr><w:color w:val="$($Palette.muted)"/></w:rPr></w:style>
  <w:style w:type="character" w:default="1" w:styleId="DefaultParagraphFont"><w:name w:val="Default Paragraph Font"/><w:uiPriority w:val="1"/><w:semiHidden/><w:unhideWhenUsed/></w:style>
  <w:style w:type="character" w:styleId="Hyperlink"><w:name w:val="Hyperlink"/><w:basedOn w:val="DefaultParagraphFont"/><w:uiPriority w:val="99"/><w:unhideWhenUsed/><w:rPr><w:color w:val="$($Palette.primary)"/><w:u w:val="single"/></w:rPr></w:style>
</w:styles>
"@
}

# Build the native bullet and decimal numbering definitions.
function New-NumberingXml {
    param(
        [hashtable]$Palette,
        [hashtable]$State
    )

    $builder = New-Object System.Text.StringBuilder
    [void]$builder.Append('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>')
    [void]$builder.Append('<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">')
    [void]$builder.Append('<w:abstractNum w:abstractNumId="1"><w:multiLevelType w:val="hybridMultilevel"/>')
    $bulletCharacters = @('&#x2022;', '&#x25E6;', '&#x25AA;')
    for ($level = 0; $level -le 2; $level++) {
        $left = 720 + ($level * 360)
        $hanging = 360
        [void]$builder.Append('<w:lvl w:ilvl="' + $level + '"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="' + $bulletCharacters[$level] + '"/><w:lvlJc w:val="left"/><w:pPr><w:tabs><w:tab w:val="num" w:pos="' + $left + '"/></w:tabs><w:ind w:left="' + $left + '" w:hanging="' + $hanging + '"/></w:pPr><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:color w:val="' + $Palette.primary + '"/></w:rPr></w:lvl>')
    }
    [void]$builder.Append('</w:abstractNum>')

    [void]$builder.Append('<w:abstractNum w:abstractNumId="2"><w:multiLevelType w:val="multilevel"/>')
    $numberFormats = @('%1.', '%1.%2.', '%1.%2.%3.')
    for ($level = 0; $level -le 2; $level++) {
        $left = 720 + ($level * 360)
        $hanging = 360
        [void]$builder.Append('<w:lvl w:ilvl="' + $level + '"><w:start w:val="1"/><w:numFmt w:val="decimal"/><w:lvlText w:val="' + $numberFormats[$level] + '"/><w:lvlJc w:val="left"/><w:pPr><w:tabs><w:tab w:val="num" w:pos="' + $left + '"/></w:tabs><w:ind w:left="' + $left + '" w:hanging="' + $hanging + '"/></w:pPr><w:rPr><w:b/><w:color w:val="' + $Palette.primary + '"/></w:rPr></w:lvl>')
    }
    [void]$builder.Append('</w:abstractNum>')

    foreach ($instance in $State.Numbering) {
        [void]$builder.Append('<w:num w:numId="' + $instance.NumId + '"><w:abstractNumId w:val="' + $instance.AbstractId + '"/></w:num>')
    }
    [void]$builder.Append('</w:numbering>')
    return $builder.ToString()
}

# Build the document settings that ask Word to refresh fields on open.
function New-SettingsXml {
    param(
        [string]$Language,
        [bool]$UseToc
    )

    $update = ''
    if ($UseToc) {
        $update = '<w:updateFields w:val="true"/>'
    }
    $lang = ConvertTo-XmlText $Language
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:zoom w:percent="100"/><w:defaultTabStop w:val="720"/>' + $update + '<w:themeFontLang w:val="' + $lang + '"/><w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat></w:settings>'
}

# Build a centered footer with a live PAGE field.
function New-FooterXml {
    param([hashtable]$Palette)

    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:jc w:val="center"/><w:pBdr><w:top w:val="single" w:sz="4" w:space="5" w:color="' + $Palette.border + '"/></w:pBdr></w:pPr><w:r><w:rPr><w:color w:val="' + $Palette.muted + '"/><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>'
}

# Build the package-level content type declarations.
function New-ContentTypesXml {
    param([bool]$PageNumbers)

    $footerOverride = ''
    if ($PageNumbers) {
        $footerOverride = '<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>'
    }
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>' + $footerOverride + '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>'
}

# Build relationships from the main document part.
function New-DocumentRelationshipsXml {
    param([bool]$PageNumbers)

    $footerRelationship = ''
    if ($PageNumbers) {
        $footerRelationship = '<Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>'
    }
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>' + $footerRelationship + '</Relationships>'
}

# Build simple core metadata without adding external dependencies.
function New-CorePropertiesXml {
    param(
        [string]$Title,
        [string]$Author
    )

    $timestamp = [DateTime]::UtcNow.ToString('yyyy-MM-ddTHH:mm:ssZ', [System.Globalization.CultureInfo]::InvariantCulture)
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>' + (ConvertTo-XmlText $Title) + '</dc:title><dc:creator>' + (ConvertTo-XmlText $Author) + '</dc:creator><cp:lastModifiedBy>' + (ConvertTo-XmlText $Author) + '</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">' + $timestamp + '</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">' + $timestamp + '</dcterms:modified></cp:coreProperties>'
}

# Write one UTF-8 OOXML part under the temporary package root.
function Write-PackagePart {
    param(
        [string]$Root,
        [string]$RelativePath,
        [string]$Content,
        [System.Text.Encoding]$Encoding
    )

    $relativeOsPath = $RelativePath.Replace('/', [System.IO.Path]::DirectorySeparatorChar)
    $path = [System.IO.Path]::Combine($Root, $relativeOsPath)
    $directory = [System.IO.Path]::GetDirectoryName($path)
    if (-not [string]::IsNullOrWhiteSpace($directory)) {
        [void][System.IO.Directory]::CreateDirectory($directory)
    }
    [System.IO.File]::WriteAllText($path, $Content.TrimStart(), $Encoding)
}

# Create a ZIP package with forward-slash entry names required by OOXML.
function New-DocxArchive {
    param(
        [string]$SourceRoot,
        [string]$ArchivePath
    )

    $fileStream = [System.IO.File]::Open($ArchivePath, [System.IO.FileMode]::CreateNew, [System.IO.FileAccess]::ReadWrite, [System.IO.FileShare]::None)
    try {
        $archive = New-Object System.IO.Compression.ZipArchive($fileStream, [System.IO.Compression.ZipArchiveMode]::Create, $false)
        try {
            foreach ($filePath in [System.IO.Directory]::GetFiles($SourceRoot, '*', [System.IO.SearchOption]::AllDirectories)) {
                $relativePath = $filePath.Substring($SourceRoot.Length).TrimStart([System.IO.Path]::DirectorySeparatorChar, [System.IO.Path]::AltDirectorySeparatorChar)
                $entryName = $relativePath.Replace([System.IO.Path]::DirectorySeparatorChar, [char]'/')
                $entry = $archive.CreateEntry($entryName, [System.IO.Compression.CompressionLevel]::Optimal)
                $inputStream = [System.IO.File]::OpenRead($filePath)
                $entryStream = $entry.Open()
                try {
                    $inputStream.CopyTo($entryStream)
                }
                finally {
                    $entryStream.Dispose()
                    $inputStream.Dispose()
                }
            }
        }
        finally {
            $archive.Dispose()
        }
    }
    finally {
        $fileStream.Dispose()
    }
}

# Validate every XML part and the required package entries before publication.
function Test-DocxPackage {
    param(
        [string]$Path,
        [bool]$PageNumbers
    )

    $archive = [System.IO.Compression.ZipFile]::OpenRead($Path)
    try {
        $entries = @{}
        foreach ($entry in $archive.Entries) {
            $entries[$entry.FullName] = $entry
        }

        $required = @(
            '[Content_Types].xml',
            '_rels/.rels',
            'docProps/core.xml',
            'docProps/app.xml',
            'word/document.xml',
            'word/styles.xml',
            'word/numbering.xml',
            'word/settings.xml',
            'word/_rels/document.xml.rels'
        )
        if ($PageNumbers) {
            $required += 'word/footer1.xml'
        }

        foreach ($name in $required) {
            if (-not $entries.ContainsKey($name)) {
                throw "Generated package is missing '$name'."
            }
        }

        foreach ($entry in $archive.Entries) {
            if ($entry.FullName.EndsWith('.xml', [System.StringComparison]::OrdinalIgnoreCase) -or $entry.FullName.EndsWith('.rels', [System.StringComparison]::OrdinalIgnoreCase)) {
                $stream = $entry.Open()
                try {
                    $xml = New-Object System.Xml.XmlDocument
                    $xml.PreserveWhitespace = $true
                    $xml.Load($stream)
                }
                finally {
                    $stream.Dispose()
                }
            }
        }
    }
    finally {
        $archive.Dispose()
    }
}

# Resolve, validate, generate, verify, and atomically publish the new manual.
function Invoke-NewWordManual {
    param(
        [string]$InputSpecPath,
        [string]$RequestedOutputPath
    )

    if (-not (Test-Path -LiteralPath $InputSpecPath -PathType Leaf)) {
        throw "Specification file not found: $InputSpecPath"
    }
    $resolvedSpec = (Resolve-Path -LiteralPath $InputSpecPath).Path
    $outputFullPath = [System.IO.Path]::GetFullPath($RequestedOutputPath)
    if ([System.IO.Path]::GetExtension($outputFullPath) -ine '.docx') {
        throw 'OutputPath must use the .docx extension.'
    }
    if (Test-Path -LiteralPath $outputFullPath) {
        throw "Output already exists. Refusing to overwrite: $outputFullPath"
    }

    $json = [System.IO.File]::ReadAllText($resolvedSpec, [System.Text.Encoding]::UTF8)
    try {
        $spec = $json | ConvertFrom-Json
    }
    catch {
        throw "The specification is not valid UTF-8 JSON. $($_.Exception.Message)"
    }
    if ($null -eq $spec -or $spec -isnot [pscustomobject]) {
        throw 'The specification root must be a JSON object.'
    }

    $palette = New-EffectivePalette -PaletteObject (Get-PropertyValue -Object $spec -Name 'palette')
    $fontFamily = Get-TextValue -Object $spec -Name 'fontFamily' -Default 'Aptos'
    if ([string]::IsNullOrWhiteSpace($fontFamily)) {
        throw 'fontFamily cannot be empty.'
    }
    $language = Get-TextValue -Object $spec -Name 'language' -Default 'es-ES'
    if ([string]::IsNullOrWhiteSpace($language)) {
        throw 'language cannot be empty.'
    }
    $useToc = Get-BooleanValue -Object $spec -Name 'toc' -Default $true
    $pageNumbers = Get-BooleanValue -Object $spec -Name 'pageNumbers' -Default $true
    $hasCover = Test-ObjectProperty -Object $spec -Name 'cover'
    if ($hasCover -and $null -eq (Get-PropertyValue -Object $spec -Name 'cover')) {
        throw 'Property cover must be a JSON object when supplied.'
    }

    $hasContent = Test-ObjectProperty -Object $spec -Name 'content'
    $contentCount = 0
    if ($hasContent) {
        $contentCount = @(Get-PropertyValue -Object $spec -Name 'content').Count
    }
    if (-not $hasCover -and $contentCount -eq 0) {
        throw 'The specification must contain a cover or at least one content block.'
    }

    $title = Get-TextValue -Object $spec -Name 'title' -Default ''
    if ([string]::IsNullOrWhiteSpace($title) -and $hasCover) {
        $title = Get-TextValue -Object (Get-PropertyValue -Object $spec -Name 'cover') -Name 'title' -Required $true
    }
    if ([string]::IsNullOrWhiteSpace($title)) {
        $title = [System.IO.Path]::GetFileNameWithoutExtension($outputFullPath)
    }
    $author = Get-TextValue -Object $spec -Name 'author' -Default 'Document owner'

    $state = @{
        NextNumId = 1
        Numbering  = New-Object System.Collections.Generic.List[object]
    }

    Add-Type -AssemblyName System.IO.Compression
    Add-Type -AssemblyName System.IO.Compression.FileSystem

    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    $workingRoot = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), 'word-manual-' + [Guid]::NewGuid().ToString('N'))
    $outputDirectory = [System.IO.Path]::GetDirectoryName($outputFullPath)
    if ([string]::IsNullOrWhiteSpace($outputDirectory)) {
        $outputDirectory = (Get-Location).Path
    }
    [void][System.IO.Directory]::CreateDirectory($outputDirectory)
    $temporaryDocx = [System.IO.Path]::Combine($outputDirectory, '.word-manual-' + [Guid]::NewGuid().ToString('N') + '.tmp.docx')

    try {
        [void][System.IO.Directory]::CreateDirectory($workingRoot)

        $documentXml = New-DocumentXml -Spec $spec -Palette $palette -State $state -HasCover $hasCover -UseToc $useToc -PageNumbers $pageNumbers
        $stylesXml = New-StylesXml -Palette $palette -FontFamily $fontFamily -Language $language
        $numberingXml = New-NumberingXml -Palette $palette -State $state

        Write-PackagePart -Root $workingRoot -RelativePath '[Content_Types].xml' -Content (New-ContentTypesXml -PageNumbers $pageNumbers) -Encoding $utf8NoBom
        Write-PackagePart -Root $workingRoot -RelativePath '_rels/.rels' -Content '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>' -Encoding $utf8NoBom
        Write-PackagePart -Root $workingRoot -RelativePath 'docProps/core.xml' -Content (New-CorePropertiesXml -Title $title -Author $author) -Encoding $utf8NoBom
        Write-PackagePart -Root $workingRoot -RelativePath 'docProps/app.xml' -Content '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>Word Manual Generator</Application><DocSecurity>0</DocSecurity><ScaleCrop>false</ScaleCrop><Company></Company><LinksUpToDate>false</LinksUpToDate><SharedDoc>false</SharedDoc><HyperlinksChanged>false</HyperlinksChanged><AppVersion>1.0</AppVersion></Properties>' -Encoding $utf8NoBom
        Write-PackagePart -Root $workingRoot -RelativePath 'word/document.xml' -Content $documentXml -Encoding $utf8NoBom
        Write-PackagePart -Root $workingRoot -RelativePath 'word/styles.xml' -Content $stylesXml -Encoding $utf8NoBom
        Write-PackagePart -Root $workingRoot -RelativePath 'word/numbering.xml' -Content $numberingXml -Encoding $utf8NoBom
        Write-PackagePart -Root $workingRoot -RelativePath 'word/settings.xml' -Content (New-SettingsXml -Language $language -UseToc $useToc) -Encoding $utf8NoBom
        Write-PackagePart -Root $workingRoot -RelativePath 'word/_rels/document.xml.rels' -Content (New-DocumentRelationshipsXml -PageNumbers $pageNumbers) -Encoding $utf8NoBom
        if ($pageNumbers) {
            Write-PackagePart -Root $workingRoot -RelativePath 'word/footer1.xml' -Content (New-FooterXml -Palette $palette) -Encoding $utf8NoBom
        }

        New-DocxArchive -SourceRoot $workingRoot -ArchivePath $temporaryDocx
        Test-DocxPackage -Path $temporaryDocx -PageNumbers $pageNumbers

        if (Test-Path -LiteralPath $outputFullPath) {
            throw "Output appeared during generation. Refusing to overwrite: $outputFullPath"
        }
        [System.IO.File]::Move($temporaryDocx, $outputFullPath)
    }
    finally {
        if (Test-Path -LiteralPath $workingRoot) {
            Remove-Item -LiteralPath $workingRoot -Recurse -Force
        }
        if (Test-Path -LiteralPath $temporaryDocx) {
            Remove-Item -LiteralPath $temporaryDocx -Force
        }
    }

    $result = Get-Item -LiteralPath $outputFullPath
    Write-Output ("Created: {0}" -f $result.FullName)
    Write-Output ("Bytes: {0}" -f $result.Length)
    Write-Output ("Numbering instances: {0}" -f $state.Numbering.Count)
}

Invoke-NewWordManual -InputSpecPath $SpecPath -RequestedOutputPath $OutputPath
