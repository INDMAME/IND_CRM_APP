---
name: safe-change-loop
description: Use when making non-trivial changes to code, configuration, architecture, data, APIs, contracts, security, deployment, or integrations.
---

# Safe Change Loop

<!-- BEGIN MANAGED: safe-change-loop-core@2.0 -->

## Purpose

Apply a short defensive loop for changes that can cause regressions. Keep behavior stable, protect user work, preserve contracts, validate the result, and keep moving unless there is a real hard stop.

This skill is additive. Follow higher-priority instructions, local `AGENTS.md` files, active skills, and project conventions first.

## Default Autonomy

- Work autonomously by default.
- If a non-critical detail is missing, choose the conservative option, continue, and state the assumption in the final response.
- Do not switch to planning or persistent goal modes by routine. In the CLI, use a brief visible plan only before major edits, then execute.
- Ask only for hard stops listed below.

## Hard Stops

Pause and ask before continuing only when there is a real risk or blocked decision:

- destructive actions, mass deletes, resets, broad rewrites, or irreversible file operations;
- production, deployment, external writes, credentials, secrets, authentication, authorization, or security-sensitive changes;
- likely data loss, data corruption, migration without safe rollback, or runtime/infrastructure changes not requested;
- unavoidable breaking changes, contract removal/rename, or compatibility loss without an approved migration path;
- conflict between active instructions, or a need to modify outside the authorized scope;
- collision with preexisting user changes that cannot be safely isolated;
- critical validation is impossible and there is no safe alternative evidence.

When pausing, report what is known, what remains uncertain, the evidence, and the exact decision needed.

## Baseline And Scope

Before editing:

- run `git status --short`;
- inspect relevant existing diffs and untracked files before touching them;
- identify the current flow, contracts, tests, config, and docs related to the change;
- do not revert, overwrite, reformat, or clean up unrelated user work;
- classify risk as local, internal, structural, contractual, or critical.

Choose the smallest safe change that satisfies the request. Avoid unrelated refactors, broad formatting, speculative abstractions, and new dependencies unless clearly justified by the requirement.

## MCP And Evidence

- Do not inventory MCP tools by routine.
- Use MCP, browser, docs, Playwright, or external tools only when they reduce a concrete uncertainty or provide required evidence.
- Prefer local code, installed versions, tests, and versioned contracts over examples or assumptions.
- For library, SDK, API, cloud, or CLI behavior that may have changed, verify with the relevant official docs tool when available.
- If an MCP that would help is unavailable, continue with local evidence when safe and state the limitation.

## Contract Compatibility

For producer-consumer, API, DTO, serialization, UI event, persistence, or config contracts:

- inspect the producer/source of truth and actual consumers;
- compare route, method, headers, auth, params, body, field names, casing, nullability, defaults, enums, dates, errors, pagination, side effects, and versioning as applicable;
- prefer additive and backward-compatible changes;
- do not hide a breaking contract change by updating both sides at once without an explicit migration strategy;
- update producer, consumer, tests, examples, and docs together when the contract intentionally changes;
- if there is no contract impact, state the evidence.

Breaking changes require approval or a project-approved migration path.

## Implementation Loop

Use this compact loop:

1. Read the relevant code and instructions.
2. Define the minimal safe approach.
3. Edit one coherent slice.
4. Validate narrowly, then broadly if risk requires it.
5. Review the diff for scope, contracts, comments, and accidental changes.
6. Iterate only with new evidence or a clearer hypothesis.

Do not weaken tests, silence errors with unjustified defaults/casts, or patch symptoms when the root cause is reasonably identifiable. If the same critical failure remains after two distinct fixes, stop editing and re-evaluate or ask if it is a hard stop.

## MMS Comments And Documentation

Keep the project's MMS policy when it exists.

- New or materially modified code units should have a concise Spanish comment when the project expects MMS comments.
- Use the exact form `//MMS - <finalidad o razon> - YYYY.MM.DD` when the language supports `//`.
- There is no space between `//` and `MMS`.
- Obtain the real local date before the first new or updated MMS comment.
- In languages without standalone `//`, use the native delimiter and include the canonical MMS string inside it.
- Do not add trivial comments, comment every line, duplicate existing explanations, or mass-update historical MMS dates outside the touched scope.
- Keep project documentation in Spanish when the local policy requires it.

## Validation

Run the fastest meaningful check first, then expand based on risk:

- format or lint for touched files;
- compile or type-check;
- targeted tests for changed behavior;
- contract, integration, UI, smoke, or build checks when the touched surface requires them;
- final diff review.

Record what ran and the real result. Distinguish preexisting failures from new regressions. If a non-critical check cannot run, state the limitation and any alternative evidence. If a critical check cannot run safely, treat it as a hard stop.

## Final Response

Keep the close-out concise and include:

- what changed and which files were touched;
- contract impact or evidence of no impact;
- validation commands and results;
- assumptions made under default autonomy;
- unresolved risks or blocked items;
- confirmation that preexisting user changes were not overwritten;
- MCP or external evidence used, if any.

<!-- END MANAGED: safe-change-loop-core@2.0 -->

<!-- BEGIN LOCAL EXTENSIONS -->
<!-- Reglas particulares anadidas por este repositorio. No borrar en actualizaciones. -->

## Validacion Manual O Externa

Use this pause rule when decisive validation can only run in an external or manual environment, such as AX/Axapta, ERP, a GUI client, unavailable credentials, controlled production, or another runtime Codex cannot access.

- Treat that situation as a validation boundary, not as an autonomous loop target.
- Stop when local investigation is complete, the artifact is prepared, feasible local validations have run or been documented, and concrete manual steps are ready for the user.
- Do not keep generating variants, jobs, patches, or diagnostics to compensate for Codex not being able to execute the runtime.
- Make at most one new iteration for each new manual result provided by the user.
- If the user shows old output, first check version/import, cache, deployment, service restart, or stale runtime before changing logic.
- Do not declare the change complete or tested end-to-end until the user provides manual evidence from that runtime.

<!-- END LOCAL EXTENSIONS -->
