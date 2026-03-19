# Chat Visual Message Contract Design

## Context

The current web assistant chat only supports one plain-text field per message. That makes the UI fragile for future visual responses because markdown, charts, and tables would all need to be inferred from free text at render time. It also encourages mixed-content answers where explanation and visualization end up coupled in the same bubble.

The new design separates content into a small structured contract:

- `markdown`
- `chart`
- `table`
- `question-to-choose-chart-type`

This keeps markdown rendering independent from visual rendering, makes payload validation possible before mounting any chart, and lets the chat remain stable even when the AI output is imperfect. When a chart payload is invalid, the renderer falls back to markdown instead of breaking the thread.

## Key Risks

- The backend currently returns a single `Answer: string` field, so the frontend cannot assume native structured messages yet.
- Visual requests can be ambiguous. Defaulting to a chart type would violate the UX requirement.
- Chart payloads can be incomplete or malformed and must never crash the chat.
- Markdown with embedded HTML or JSX would weaken the contract and make the rendering path harder to keep safe.

## Recommended Approach

Use a UI-level wrapper plus a serializable message contract:

- `ChatMessage` is the content contract and is safe to serialize.
- `AssistantChatMessage` remains the UI wrapper with `id`, `role`, `state`, `meta`, and `retryQuestion`.
- The AI continues returning `Answer: string`, but the prompt instructs it to return raw JSON with shape `{"messages":[...]}`.
- The frontend parses that JSON, validates each chart/table payload, and falls back to markdown when needed.

This is the smallest incremental change that supports the new feature now without requiring a backend contract migration first.

## File Plan

- `components/commons/chat/chatMessageContract.ts`
- `components/commons/chat/chatMessageFactories.ts`
- `components/commons/chat/chatIntentUtils.ts`
- `components/commons/chat/chatMessageValidation.ts`
- `components/commons/chat/chatMessageParsing.ts`
- `components/commons/chat/chatPromptConventions.ts`
- reusable presentational components under `components/commons/chat/`
- integration updates in:
  - `components/commons/chat/assistantChatTypes.ts`
  - `components/commons/chat/AssistantChatShell.tsx`
  - `pages/gastos/list/useExpenseSheetsAssistant.ts`
  - `pages/gastos/list/ExpenseSheetsAssistant.tsx`

## Validation Rules

- `bar` and `line`: require `data`, `xKey`, `yKey`
- `pie`: require `data`, `nameKey`, `dataKey`
- `table`: require `columns`, `rows`
- invalid visual payload: convert to markdown fallback and keep the chat alive

## Conversational Flow

1. User asks a normal question.
2. Frontend detects visualization intent.
3. If the request is ambiguous, the chat returns `question-to-choose-chart-type` locally and does not call the API yet.
4. After the user chooses a supported type, the frontend calls the existing assistant endpoint with structured answer instructions.
5. The AI returns either:
   - one `markdown` message, or
   - one `markdown` message followed by one `chart` or `table` message
6. The shell renders each message independently.

## Why Dumb Visual Components

Reusable presentational components make the architecture safer and easier to extend:

- no fetch logic inside charts or tables
- no dependency on CRM or expense-sheet terminology
- no interpretation logic in renderers
- easier reuse in other chats or future assistant surfaces

## No Third-Party Verification

No verificado por terceros. The design is based on the current repository structure and the existing assistant response contract in this codebase.
