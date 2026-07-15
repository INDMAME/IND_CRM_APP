# User Manual Content Contract

Use this reference to plan, write, or restructure an application manual and to prepare JSON for `scripts/new_manual.ps1`.

## Source of truth

Resolve conflicting information in this order:

1. The current, working application for user-visible behavior.
2. Current code, configuration, permissions, API contracts, and integration behavior.
3. Approved current documentation and process decisions.
4. Older manuals, drafts, task lists, and historical notes.

Verify labels, capitalization, accents, roles, statuses, enabled actions, validation messages, and navigation against the current application. Reproduce UI labels exactly and format key names in bold. Do not silently copy an obsolete workflow because it exists in an older manual.

Modify only documents in the authorized scope. If an outdated source must be corrected, preserve its original unless replacement is explicitly requested, create a versioned output, and report every file changed and the sections affected.

## Novice-reader standard

Assume the reader may not know what a browser, tab, link, menu, filter, required field, or save action is unless the brief identifies a known system that can be assumed. Introduce only the basics needed for the task and use the same term consistently.

Each procedure should state:

- What the reader will achieve.
- Required role, status, information, and prior steps.
- Where to start and how to reach the screen.
- One observable action per numbered step.
- The expected visual result after important actions.
- What to do if the expected result does not appear.
- Whether the action saves, submits, approves, rejects, posts, or cannot be undone.

Never hide a prerequisite in a note after the procedure. Distinguish application roles from people or job titles. Explain why an action is unavailable when role or status controls it.

## Recommended manual order

1. Cover, version, owner, and revision date.
2. Table of contents generated from Word heading levels.
3. Purpose, scope, audience, conventions, and security notice.
4. Access, sign-in, browser basics, and main navigation.
5. Roles, permissions, key concepts, statuses, and terminology.
6. End-to-end process overview and state flow.
7. Procedures in the order a user performs them.
8. Approval, rejection, rollback, accounting, or other role-specific actions.
9. External-system visibility or integrations, limited to what the user needs to know.
10. Common errors, recovery, frequently asked questions, and glossary.

Keep related text and screenshots together. Introduce a state diagram before detailed state transitions. Place exceptions immediately after the step or rule they qualify.

## Writing rules

- Use direct, plain language and short sentences.
- Use numbered lists for sequences and bullets for choices or facts.
- Begin steps with an action verb and bold the exact control or field name.
- Do not invent screens, buttons, permissions, or outcomes.
- Separate facts from assumptions and mark any item requiring verification.
- Use the placeholder format from `references/document-design.md` when a screenshot is pending.
- Preserve screenshots and existing wording during formatting-only work.
- Keep integration explanations short when the external system is already known.

## Choose the operation mode

- **Create:** Build a new DOCX from approved content, screenshots, and configuration.
- **Formatting-only:** Improve styles, spacing, indents, palette, and placement without changing visible content or structure.
- **Restructure:** Reorder, add, remove, or rewrite content only with explicit authorization; provide a section-level change summary.

## JSON accepted by `scripts/new_manual.ps1`

The script accepts one JSON root object and creates an A4 portrait DOCX. JSON comments and trailing commas are not valid. It refuses to overwrite an existing output file.

Root properties:

- `$schemaVersion` (optional): accepted for specification versioning and currently ignored.
- `cover` (optional object): `organization`, `product`, `label`, `title`, `subtitle`, `version`, `owner`, and `date`. If `cover` is present, `cover.title` is required.
- `title` and `author` (optional strings): core properties. Title falls back to `cover.title`, then the output filename; author defaults to `Document owner`.
- `language` (optional string, default `es-ES`) and `fontFamily` (optional string, default `Aptos`).
- `toc` (optional boolean, default `true`), `tocTitle` (default `Contents`), and `tocPlaceholder` (optional string).
- `pageNumbers` (optional boolean, default `true`).
- `palette` (optional object): override or add tokens using exactly six hexadecimal RGB digits, without `#`.
- `content` (ordered array): optional only when a cover exists; otherwise at least one block is required.

Canonical palette tokens are `primary` `00296B`, `deep` `001F4D`, `secondary` `244C82`, `body` `1F437D`, `surface` `F8FAFC`, `readonlySurface` `F1F5F9`, `pageBackground` `F5F6F7`, `border` `E2E8F0`, `strongDivider` `CBD5E1`, `muted` `64748B`, `draft` `94A3B8`, `requested` `F59E0B`, `approved` `22C55E`, `rejected` `EF4444`, `paid` `00296B`, and `white` `FFFFFF`. Aliases `primaryDark`, `text`, `warning`, `success`, and `danger` are accepted and synchronized with `deep`, `body`, `requested`, `approved`, and `rejected`.

Content blocks:

- Heading: `{"type":"heading","level":1,"text":"Section"}` where `level` is an integer from 1 through 3. The first heading must be level 1 and later headings cannot jump more than one level.
- Paragraph: `{"type":"paragraph","text":"Text","align":"left"}`; alignment is `left`, `center`, `right`, or `justify`.
- Lists: `bulletList` or `numberedList` with `items`, or `list` with `style` set to `bullet` or `numbered`.
- Callout: `{"type":"callout","kind":"warning","title":"Important","text":"..."}`; kind is `info`, `navigation`, `warning`, `requested`, `success`, `approved`, `danger`, `error`, `security`, `rejected`, or `neutral`. Optional `color` overrides its accent.
- Screenshot placeholder: type `screenshot` or `screenshotPlaceholder`; accepts `id`, `label`, `description` or `text`, `purpose`, `screenState`, `safeDataRule`, `caption`, `altText`, and integer `heightTwips` from 900 through 9000 (default 2200).
- Page break: `{"type":"pageBreak"}`.

Heading, paragraph, callout, and object list-item blocks may use `runs` instead of `text`. Each run is `{"text":"Save","bold":true,"italic":false,"color":"primary"}` and requires nonempty text. `color` accepts a palette token or six RGB hexadecimal digits. Lists require at least one item; items may be strings or objects with `text` or `runs` and an integer `level` from 0 through 2.

Minimal configuration:

```json
{"cover":{"title":"User Manual"},"toc":false,"content":[{"type":"heading","level":1,"text":"Start"},{"type":"paragraph","text":"Follow these instructions."}]}
```

Validate the configuration and the generated DOCX with the scripts named in `SKILL.md`; do not treat successful file creation as proof of a correct manual.
