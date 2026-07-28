# DOCX and OOXML Safety

Use this reference when a Word document must be edited without losing content, fields, images, or package relationships.

## Select the editing method

| Situation | Preferred method |
| --- | --- |
| Create a new manual | Use `scripts/new_manual.ps1` for the supported baseline, then refine with Word or a DOCX library if needed. |
| Style an existing document precisely | Edit only the required OOXML nodes and validate package invariants. |
| Update a rendered TOC or pagination | Use Microsoft Word automation when available and permitted. |
| Perform broad content restructuring | Use a high-level DOCX library or Word automation, then run strict package validation. |
| Inspect or compare a DOCX | Treat it as a ZIP package and read XML and media without conversion. |

Avoid format round trips through HTML, PDF, RTF, Google Docs, or LibreOffice when exact preservation matters. Conversion may replace fields, change wrapping, re-encode images, alter fonts, or move page breaks.

## Work on a versioned copy

1. Confirm the source path and calculate its hash.
2. Derive the next output name without overwriting the source, for example `Manual V08.docx` to `Manual V09.docx`.
3. Copy or extract into a temporary directory outside the source package.
4. Modify only the parts needed for the requested operation.
5. Rebuild to a temporary DOCX, validate it, then move it to the final output path.
6. Recalculate the source hash to prove the original was not modified.

Never edit a file that is open and locked in Word. Never overwrite the last known good version.

## Package rules

- Keep `[Content_Types].xml` and all package-relative paths at the ZIP root.
- Preserve namespaces and compatibility attributes such as `mc:Ignorable`.
- Respect WordprocessingML child order in `w:pPr`, `w:rPr`, `w:sectPr`, drawings, and fields.
- Preserve relationship IDs and targets unless the requested change adds or removes the related object.
- Preserve `word/media/*` bytes during formatting-only work.
- Preserve `wp:inline` versus `wp:anchor`; changing it changes page layout and overlap behavior.
- Preserve `w:sectPr`, headers, footers, footnotes, endnotes, comments, numbering, themes, and custom XML unless they are explicitly in scope.
- Create `w:pPr` or `w:rPr` only when necessary, in the schema-valid position.
- Express layout through OOXML properties, not spaces, repeated tabs, or blank paragraphs.

## Operation modes

### Creating a document

New content, styles, numbering, fields, and media may be created. Validate usability, hierarchy, generated fields, and visual output. Use `references/manual-spec.md` as the content contract and `references/document-design.md` as the design contract.

### Formatting-only

Change only style and layout properties. Text, paragraph order, images, hyperlinks, fields, relationships, sections, and explicit breaks are invariants. Do not split, merge, delete, or add visible paragraphs merely to improve spacing.

If the user also authorizes a media transformation or field refresh, treat it as a separately declared exception rather than silently widening formatting-only scope. Define the exact targets and acceptance criteria first. For image compression, identify screenshots separately from logos and diagrams, agree on format, dimensions, quality, and readability, and validate every changed media part. For a TOC refresh, preserve the field definition and use Word when rendered page numbers must be current. Expand comparison allowlists only for the package parts required by those exceptions, and report that the normal media or field invariants were intentionally relaxed.

### Content restructuring

Reordering, rewriting, adding, or deleting content is allowed only when the user authorizes it. Record what moved or changed, retain exact UI labels, and revalidate every cross-reference, image placement, list, and TOC entry.

## TOC and field safety

A Word TOC is a field, not ordinary page-number text. Preserve `w:fldChar`, `w:instrText`, field result runs, hyperlinks, and bookmarks. Set `w:updateFields` in `word/settings.xml` when the user expects Word to refresh fields on open. Do not claim that displayed page numbers are current unless Word actually updated and saved the document.

Preserve other fields such as page numbers, references, dates, and document properties. Compare field instruction text and field character counts before and after an edit.

## Validation contract

For every output:

- Confirm the file opens as a ZIP and every XML part parses.
- Confirm required parts and relationship targets exist.
- Confirm no duplicate ZIP entries were introduced.
- Count paragraphs, drawings, images, hyperlinks, relationships, fields, sections, and breaks.
- Inspect all image relationship targets and hash every media file.
- Check drawing mode counts (`wp:inline` and `wp:anchor`).
- Check `w:br`, `w:pageBreakBefore`, section breaks, tabs, indents, and blank paragraphs.
- Confirm the expected styles, numbering references, and outline levels still exist.
- Confirm TOC field structure and `w:updateFields` behavior.
- If rendering is available, inspect the cover, TOC, dense list pages, callouts, wide images, section transitions, and final page.

For formatting-only output, additionally compare a deterministic content fingerprint that includes visible text in order, tabs, line/page breaks, field instructions, hyperlinks, drawing relationship IDs, and media hashes. A text-only hash is necessary but not sufficient.

## Failure handling

If validation detects lost text, altered media, broken relationships, invalid XML, unexpected anchors, missing fields, or changed breaks, discard the output and restart from the untouched source. Do not repair a damaged derivative when the source is still available. Report any check that could not be performed, especially rendered page comparison or Word field refresh.
