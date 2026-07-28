# Word Manual Design System

Use this reference when defining or applying the visual system of a user manual. Preserve an existing document's typography and layout unless the user explicitly requests a redesign.

## Design goals

- Make the document formal, compact, predictable, and easy to scan.
- Write for a reader with little or no technical knowledge.
- Use formatting to expose hierarchy; never use decoration that competes with instructions.
- Keep screenshots, captions, callouts, and lists visually attached to the step they explain.
- Use color as reinforcement, never as the only carrier of meaning.

## Structure and spacing

| Element | Recommended treatment |
| --- | --- |
| Cover | Product, document title, version, owner, and date. Use one strong brand accent. |
| Table of contents | Use Word heading levels and a real TOC field. Do not type page numbers manually. |
| Heading 1 | Primary navy text on white, compact spacing, and keep with next paragraph. Reserve solid bars for a new document or approved redesign. |
| Heading 2 | Secondary navy text; add a light divider only in an approved redesign. |
| Heading 3 | Muted accessible text; no heavy fill. |
| Body | 10-11 pt, dark text, 1.0-1.15 line spacing, 3-6 pt after paragraphs. |
| Numbered steps | One action per step; use a short bold action label when helpful. |
| Bullets | Use for choices, conditions, or unordered facts, not procedures. |
| Images | Inline, centered, proportional, and placed immediately after the relevant instruction. |
| Captions | Muted text below the image; identify what the reader should notice. |
| Callouts | Light surface, semantic border, short bold lead label, and compact internal spacing. |

Avoid manual spaces or tabs for alignment. Use paragraph indents, hanging indents, tab stops, tables without visible borders, or styles. Keep list levels consistent and leave a small separation before and after each list without inserting empty paragraphs.

## Corporate palette

Use these exact opaque values when the source web application uses the same palette:

| Role | Hex |
| --- | --- |
| Primary navy | `#00296B` |
| Deep navy | `#001F4D` |
| Secondary navy | `#244C82` |
| Muted text | `#64748B` |
| Placeholder gray | `#94A3B8` |
| Border | `#E2E8F0` |
| Strong divider | `#CBD5E1` |
| Read-only surface | `#F1F5F9` |
| Web canvas reference | `#F5F6F7` |
| Callout surface | `#F8FAFC` |
| White | `#FFFFFF` |

Status accents are `#94A3B8` for Draft, `#F59E0B` for Approval requested, `#22C55E` for Approved, `#EF4444` for Rejected, and `#00296B` for Paid. Pair every status color with the visible status name or an icon.

Keep Word pages white unless the user explicitly requests a colored page background. `#F5F6F7` is the source web canvas color, not the default printed page color. For callouts, keep `#F8FAFC` as the fill and use a semantic border: primary navy for information or navigation, amber for warnings, green for successful outcomes, and red for errors, security, or blocking conditions. Do not tint full pages or screenshots.

## Typography

- In formatting-only work, preserve the document's current font unless replacement is explicitly authorized.
- For a new manual, prefer Montserrat when it is installed and approved; otherwise use Aptos or Arial for reliable Word compatibility.
- Use bold for exact UI labels, actions, field names, roles, statuses, and other key terms.
- Do not use underlining for emphasis because readers may interpret it as a link.
- Keep heading size changes moderate so the manual remains compact.

## Screenshots and placeholders

When screenshots are not yet available, insert a visible placeholder instead of inventing an image. Use this pattern:

`[IMAGE PLACEHOLDER - Insert a screenshot of <screen or control> to show <what the reader must identify or do>.]`

Format placeholders like image frames: centered, light surface, thin border, and muted text. Include enough detail for the future editor to capture the correct state, role, filters, menu, or validation message. Do not leave placeholders in a final release unless the user accepts them.

For real screenshots:

- Do not crop out labels, breadcrumbs, status, or context needed to orient a novice.
- Remove or mask personal, financial, credential, and production data.
- Add arrows or highlights only when the target would otherwise be ambiguous.
- Keep annotations clear of controls and text.
- Add alternative text when the tooling supports it.

## Flow diagrams

Keep process diagrams compact enough to read on one page. Use distinct shapes for states and decisions, thin directional arrows, and short connector labels placed beside the exact arrow they describe. Route return paths around the outside when central crossings would become ambiguous. Never allow a label, node, or callout to cover an arrow or another element. Use the application status colors consistently and still print the status name inside each node.

## Accessibility checks

- Use high-contrast text: white on primary navy, or primary/dark text on white and light surfaces.
- Do not place muted gray text on gray fills when it becomes hard to read.
- Keep text readable at 100 percent zoom and avoid screenshots that require zooming to identify controls.
- Preserve meaningful heading order; do not skip directly from Heading 1 to Heading 3.
- Repeat table headers across pages and avoid merged cells unless they materially improve understanding.
- Ensure instructions remain understandable when printed in grayscale.

## Scope discipline

Choose the least invasive visual operation that satisfies the request. A palette update can recolor headings, key labels, callouts, dividers, and status names without changing text, images, paragraph order, page breaks, or field structure. White text on a solid primary heading bar is acceptable for a new document or full redesign only after contrast, wrapping, and pagination are visually checked. A full redesign requires explicit authorization and broader visual validation.
