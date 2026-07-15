---
name: architecture-flow-docs
description: Use when creating, updating, moving, exporting, or reviewing architecture diagrams, Mermaid sources, communication flows, sequence diagrams, data-flow diagrams, user-level diagrams, or documentation-as-code in IND_INTERNAL_API or IND_CRM_API.
---

# Architecture Flow Docs

## Purpose

Use this skill to create or update Markdown architecture documents and Mermaid
diagram sources for CRM/API communication, data flow, integration, error, AI,
Axapta, and external-service flows.

This skill is mandatory whenever the user asks for a diagram, data diagram,
communication flow, Mermaid file, architecture graphic, user-level process
diagram, exportable SVG/PNG diagram, or any reorganization of architecture
diagram folders.

## Required workflow

1. Load the project guardrail skill first when it exists:
   - `ind-internal-api-guardrails` in `IND_INTERNAL_API`.
   - `ind-crm-backend-guardrails` in `IND_CRM_API`.
2. Read source before drawing. Prefer current code, endpoint docs, Swagger
   annotations, Postman collections, API clients, and Axapta/X++ contracts.
3. State a short plan before non-trivial edits.
4. For every new communication flow, data-flow diagram, or integration diagram,
   create both the technical version and the user-level version unless the user
   explicitly asks for only one audience.
5. Choose the audience level:
   - Technical diagrams explain systems, routes, headers, DTOs, services,
     Axapta, and external dependencies.
   - User-level diagrams explain the same flow in business language for
     non-technical readers.
6. Create or update both artifacts for each diagram:
   - Markdown page (`*.md`).
   - Mermaid source (`*.mmd`).
7. Update the relevant README when adding, moving, or removing diagrams.
8. Keep `docs/architecture/assets` for exported images only.
9. Do not change production code for documentation-only tasks.

## Official folder structure

Use this structure in `IND_INTERNAL_API` and `IND_CRM_API`:

```text
docs/architecture/
  README.md
  export-diagrams.ps1
  diagrams/
    README.md
    technical/
      README.md
      <process>/
        <diagram>.md
        <diagram>.mmd
    user/
      README.md
      <process>/
        <diagram>.md
        <diagram>.mmd
  assets/
    technical/<process>/       # Exported technical images
    user/<process>/            # Exported user-level images
```

If a project does not yet have this tree, create only the folders needed by the
current task.

Standard process folders are `context`, `integration`, `auth`, `expenses`,
`tickets`, `ai`, and `errors`. Add a new process folder only when the current
flow does not fit one of those categories.

## Global skill installation

The canonical copy of this skill should live at:

```text
C:\Users\marco.meza\.codex\skills\architecture-flow-docs
```

Project-local skill folders should be directory junctions to that canonical
folder when Windows supports it:

```text
<repo>\.codex\skills\architecture-flow-docs -> C:\Users\marco.meza\.codex\skills\architecture-flow-docs
```

This lets any edit made from one project update the same skill for all projects.
If a junction cannot be used, copy the skill folder and clearly report that the
copy must be synchronized manually.

## Documentation standards

- Never invent contracts. If a route, DTO, header, field, side effect, or
  sequence is not proven, mark it as `pendiente de validar`.
- Do not include secrets, tokens, credentials, tenant ids, company ids, AX user
  ids, connection strings, full environment URLs, or sensitive payload bodies.
- Preserve existing project, route, class, and AOT names.
- Do not introduce new names with reserved project prefixes outside
  Axapta/AOT/X++ artifacts.
- Prefer ASCII in docs and scripts unless the target file already requires
  another character set.
- Mention response envelopes, trace ids, diagnostics, and error codes when they
  are part of the flow.
- For user-level docs, avoid class names, DTO names, route names, headers, and
  internal service names unless the user explicitly asks for them. Prefer
  terms such as screen, user, company, ticket, expense sheet, image, audio,
  save, review, error, and retry.
- User-level diagrams must mirror their technical counterpart: same business
  steps, decisions, side effects, and final outcomes. Only the wording changes.
- When a user-level diagram needs a technical term, explain it in parentheses,
  for example `OCR (extracts text from an image)`, `AI (suggests data)`, or
  `Axapta (central business system)`.
- Keep user-level messages self-explanatory. A non-technical reader should not
  need to open the technical diagram to understand the process.

## Synchronization rules

- A technical diagram and its user-level counterpart must describe the same
  business flow and side effects.
- Prefer the same Mermaid diagram type for counterparts when practical. If the
  technical diagram is a sequence, the user-level version should usually also
  be a sequence with simpler participants and messages.
- Put a `Technical source:` link at the top of every user-level Markdown file.
- Update technical and user-level `.mmd` files together when the behavior
  changes.
- If only one audience level is updated, add `pendiente de validar` to the
  other level or explicitly state why it has no counterpart.
- Keep file names parallel when practical, for example
  `diagrams/technical/ai/ticket-image-ai-sequence.mmd` and
  `diagrams/user/ai/ticket-image-ai.mmd`.

## Mermaid standards

- Use fenced Markdown blocks with `mermaid`.
- Keep separate `.mmd` files in sync with Markdown diagrams.
- Avoid `rect rgb(...)` in sequence diagrams because hardcoded light colors
  often fail in dark preview themes.
- Break long notes and messages with `<br/>`.
- Keep labels short enough to render without horizontal clipping.
- Use generic Mermaid node ids, and put real system names in labels.
- Prefer `sequenceDiagram` for request/response flows, `flowchart` for system
  context or data flow, and simple branching for error paths.

## Verification checklist

Before finishing:

- Run an ASCII check on changed docs when the repo expects ASCII.
- Search for forbidden secrets or full environment-specific URLs.
- Confirm every new `.md` diagram has a matching `.mmd` source.
- Confirm `README.md` indexes new diagrams.
- Confirm user-level diagrams are indexed in `docs/architecture/diagrams/user`
  when they exist.
- Confirm technical and user-level counterparts are synchronized or explicitly
  marked `pendiente de validar`.
- Validate PowerShell export scripts with `[scriptblock]::Create(...)` if they
  were changed.
- If Mermaid CLI is installed, export the diagrams or report that export was
  not run.
