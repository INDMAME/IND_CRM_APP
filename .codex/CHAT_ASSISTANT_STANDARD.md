# Chat Assistant Standard (IND_CRM_APP)

## Purpose
- Define one standard chatbot pattern for future pages.
- Keep assistant visuals consistent while allowing each module to plug in its own backend logic and prompts.

## Standard architecture
- Shared dumb shell:
  - `Web/wwwroot/react/src/components/commons/chat/AssistantChatShell.tsx`
  - Owns the common launcher, overlay, panel layout, message bubbles, warning section, composer, and quick-action rendering.
- Shared contracts:
  - `Web/wwwroot/react/src/components/commons/chat/assistantChatTypes.ts`
  - Defines reusable message and quick-action shapes.
- Module adapter:
  - Example: `Web/wwwroot/react/src/pages/gastos/list/ExpenseSheetsAssistant.tsx`
  - Maps page hook state, localized copy, icons, and callbacks into the shared shell.
- Module hook:
  - Example: `Web/wwwroot/react/src/pages/gastos/list/useExpenseSheetsAssistant.ts`
  - Owns prompts, request lifecycle, retries, context capture, backend calls, and business validation.

## Dumb-component boundary
- `AssistantChatShell` must not:
  - Know API endpoints.
  - Read page stores or module context directly.
  - Build prompts.
  - Parse module-specific DTOs.
- `AssistantChatShell` may:
  - Apply standard message formatting for readability.
  - Control standard visual states from props.
  - Render optional warnings and retry affordances from normalized message props.

## Standard UI behavior
- Floating launcher uses the shared bot image and shared sizing rules.
- Header avatar is visible before the first assistant response and hidden after responses begin.
- Assistant responses keep the avatar inside each bot bubble.
- Composer behavior is standard:
  - multiline textarea
  - animated passive ellipsis
  - submit button docked inside the composer
  - disabled state when no context or while sending
- Warning details stay secondary and collapsible.
- Amount-heavy answers get light formatting help for scanability.

## Integration checklist for a new page
1. Create a page-local hook that owns request state and business rules.
2. Normalize messages and quick actions to the shared chat contracts.
3. Add a small adapter component in the page module that renders `AssistantChatShell`.
4. Reuse localization resources for all visible copy.
5. Do not fork the shell unless the design system itself changes.

## Current implementation status
- Expense sheets list is the first adopter.
- File map:
  - shared shell: `Web/wwwroot/react/src/components/commons/chat/AssistantChatShell.tsx`
  - shared types: `Web/wwwroot/react/src/components/commons/chat/assistantChatTypes.ts`
  - expense adapter: `Web/wwwroot/react/src/pages/gastos/list/ExpenseSheetsAssistant.tsx`
  - expense hook: `Web/wwwroot/react/src/pages/gastos/list/useExpenseSheetsAssistant.ts`

## Last updated
- 2026-03-18
