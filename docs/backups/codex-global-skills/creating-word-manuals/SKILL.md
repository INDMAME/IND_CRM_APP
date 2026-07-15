---
name: creating-word-manuals
description: Use when creating, restructuring, formatting, branding, versioning, or validating professional Microsoft Word manuals and DOCX user guides, especially when content, screenshots, fields, tables of contents, hyperlinks, or pagination must be preserved.
---

# Creating Word Manuals

## Purpose

Create compact, accessible Word manuals while treating source truth, authored content, document structure, and visual design as separate contracts. Keep the source untouched, produce a versioned DOCX, validate in proportion to risk, and disclose any pending visual review.

## Classify the request

| Class | Authorized work | Route |
|---|---|---|
| New manual | Build from approved sources | Specify, generate, inspect, render |
| Formatting-only | Change appearance, not content or order | Inspect, version, edit narrowly, compare |
| Content revision | Add, rewrite, integrate, remove, or reorder | Confirm authority and scope, then edit |
| Audit or plan | Diagnose or propose only | Read only |

When "reorganize" is combined with "do not change anything," reorganize visually only.

Use this source precedence unless the user overrides it:

1. Current application or validated runtime behavior.
2. Current code, contracts, configuration, and approved requirements.
3. Current documentation.
4. Older manuals, drafts, and screenshots.

Never invent labels, permissions, steps, errors, or outcomes. Mark unresolved behavior as pending validation.

## Load the contracts

Resolve bundled paths from this skill directory, never from the user's project.

- Read references/document-design.md completely for hierarchy, novice writing, compact spacing, lists, callouts, screenshots, palette, and accessibility.
- Read references/ooxml-safety.md completely before changing an existing DOCX or any field, TOC, list, image, relationship, revision, signature, or protection.
- Read references/manual-spec.md completely before generating a new manual.

Identify audience, language, roles, modules, environment, version, source and output paths, invariants, authoritative brand source, and available Word-compatible renderer.

## Create a new manual

1. Inventory approved sources and record conflicts.
2. Build an evidence matrix per journey: role, precondition, start screen, exact UI labels, steps, result, restrictions, and source.
3. Copy assets/manual-spec.example.json and complete the schema from references/manual-spec.md.
4. Use one action per numbered step. Explain browser, tab, link, button, field, menu, scroll, save, cancel, and sign-out before first use for novice readers.
5. Add screenshot placeholders with ID, purpose, required state, safe-data rule, caption, and alt text.
6. Generate and inspect:

       powershell -ExecutionPolicy Bypass -File scripts/new_manual.ps1 -SpecPath manual-spec.json -OutputPath Manual-V01.docx
       powershell -ExecutionPolicy Bypass -File scripts/inspect_docx.ps1 -Path Manual-V01.docx -ReportPath Manual-V01.inventory.json

7. Render in Word or the best compatible renderer. A manual with placeholders remains a controlled draft unless the user accepts them as final.

## Change an existing DOCX

1. Hash and inspect the source. Stop before mutation for encryption, rights management, signatures, unapproved macros, or protection that saving could invalidate.
2. Never overwrite it. Increment its numeric Vnn suffix, preserving leading zeros; keep temporary files outside the repository unless requested.
3. Select the least destructive editor:
   - targeted OOXML for narrow formatting with preservation-sensitive features;
   - Word for exact pagination, wrapping, or field refresh;
   - a high-level DOCX writer only when its normalization is allowed.
4. Do not add a persistent dependency merely for convenience.
5. For the approved IND design, apply the bundled palette:

       powershell -ExecutionPolicy Bypass -File scripts/apply_branding.ps1 -SourcePath Source.docx -OutputPath Source-VNext.docx -PalettePath assets/ind-web-palette.json

   Adapt the JSON for other brands; do not hardcode brand values in the script. Never recolor, crop, replace, or recompress screenshots without explicit authorization.

6. For formatting-only work, comparison is mandatory:

       powershell -ExecutionPolicy Bypass -File scripts/compare_docx.ps1 -SourcePath Source.docx -CandidatePath Source-VNext.docx -AllowedChangedParts word/document.xml -ReportPath Source-VNext.validation.json

Treat authorized media transformations or field refreshes as separately declared exceptions with exact targets, acceptance criteria, and narrowly expanded validation. Any unexplained delta fails; discard the derivative and restart from the untouched source.

## Gates and delivery

For formatting-only work preserve authored text and order, media bytes and drawing mode, relationships, fields and TOC results, hyperlinks, bookmarks, lists, breaks, sections, revisions, and content controls unless explicitly authorized. Require well-formed XML, a reopenable package, an unchanged source hash, and changes limited to the allowlist. Never update fields, accept revisions, or rebuild numbering implicitly.

Inspect the rendered cover, TOC, dense lists, callouts, images, section transitions, wrapping, clipping, overlap, blank pages, and screenshot readability. Structural checks never prove visual correctness. Without a compatible renderer report exactly: "Structurally validated; visual acceptance pending."

Deliver the output path first, followed by what changed, the untouched source, validation results, files created or modified, and remaining manual checks. Do not leave preview or validation artifacts in a project repository unless requested.
