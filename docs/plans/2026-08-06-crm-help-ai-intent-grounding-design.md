# CRM Help AI Intent Grounding Design

## Context

The Home help chatbot currently applies lexical retrieval before calling OpenAI. When a natural question such as "Como debo meter un gasto?" does not reach the lexical threshold, the API returns `notDocumented` immediately. Short similar words can also select the wrong topic, as with `hora` and `hoja`.

The user expectation is different: every question sent from the selected Home help module should be interpreted by the AI, while the manual remains the only factual source.

## Options Considered

1. Add colloquial aliases only. This fixes known phrases but repeats the same failure for future wording and still lets lexical similarity decide intent.
2. Call the AI only after a lexical miss. This improves false negatives but leaves false positive topic selection unchanged.
3. Give one AI call the complete validated evidence scope of the selected module. The model determines intent and returns an answer with validated citations from that scope.

## Decision

Use option 3 for requests with `selectedModuleId` and no `selectedTopicId`.

- The module remains a strict security and documentation boundary.
- Exact topic selection keeps its existing behavior.
- Requests without a selected module keep the existing broad lexical selection flow.
- The API response contract and frontend behavior remain unchanged.
- The existing structured output, source-key validation, route allowlist, redaction, rate limiting, and no-storage policy remain unchanged.
- One model request both interprets the question and writes the grounded answer; no second intent-classification request is added.

## Object Boundaries

- `HelpTopicRetriever` owns construction of the complete module evidence scope and lexical ranking for diagnostics.
- `HelpOpenAiAnswerService` owns intent interpretation, grounded synthesis, token budgeting, and structured output validation.
- `INDHelpController` remains orchestration-only and keeps the public contract stable.
- Canonical help topic metadata and evaluation cases remain under `docs/crm-help`.

## Behavior Invariants

- The AI can use only topics that belong to the selected module.
- A missing module or a selected topic outside the selected module still returns `notDocumented` without calling OpenAI.
- A direct `selectedTopicId` still uses only that exact topic.
- Citations and navigation actions must match server-provided allowlists.
- Unsupported facts must be described as undocumented; the model must not invent steps.
- Conversation history can help interpret follow-up wording but cannot override the manual.

## Validation

- Retrieval regression: every valid selected module exposes all of its published topics with mode `module-ai-scope`.
- Real phrasing coverage: `meter`, `imputar`, and `registrar` a gasto under `expenses`.
- Ambiguous wording coverage: `hora de gasto` must be interpreted by the model from the complete module evidence instead of being preselected as `hoja` by lexical distance.
- Deterministic bundle compiler, retrieval suite, answer corpus validation, Debug x86 API build, frontend quality gates, clean-clone DEV deploy, and runtime health checks.
