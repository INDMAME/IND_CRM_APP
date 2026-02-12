# Quality Checklist (IND_CRM_APP)

## Purpose
- Single place for validation steps before publish or review.

## Refactor iteration gate (required)
- For each meaningful extraction/refactor step, run:
  - `npm run build:react`
  - `npx tsc --noEmit`
  - `dotnet test -v minimal`
- Do not continue to the next step until the current step is green.

## Frontend (React + Tailwind)
- `npm run build` (react + css)
- Release build: `npm run build:react:prod` and `npm run build:css`
- Verify critical pages: visitas create/detail/history, gastos list/detail/line-detail, text editor, audio recorder
- Critical behaviors: date filters, dropdowns, permissions, confirm modal, action mark
- Read-only color contract verified per `COMPONENT_CONTRACTS.md`
- Verify ESM loading: each Razor page uses `script type="module"` and `/js/chunks/*` assets resolve without 404
- Verify page entry pattern:
  - page entry composes providers and mount helper only
  - heavy logic is in hooks/forms, not bootstrap files
- Verify no client fetch waterfalls were introduced for independent requests
- Verify global listeners are cleaned up in hook teardown
- Verify unsaved-change prompts use app modal flow (no browser-native popup fallback)
- Verify edit/delete/create icons are permission-gated in UI where applicable

## Backend (.NET)
- `dotnet build`
- `dotnet test -v minimal`
- Verify MVC routes for Visitas and System
- Confirm OIDC callback and Entra context flow

## Regression checks
- Date range selection works (from/to focus and payload format)
- Permission modal still triggers on 403
- SessionStorage keys preserved
- Read-only fields match color contract (label #00296be0, value #64748b)
- Text editor return flow works for create and detail pages
- If E2E uses Playwright, ensure auth flow is valid for current login mode (Entra/SSO or local form login)

## Guardrail documentation checks
- If `.codex/*.md` or `.codex/config.toml` changed, run `npm run sync:skill:local:references`
- Validate sync locally with `npm run check:codex:references`
- Confirm root `.codex/*.md` and `.codex/skills/ind-crm-frontend-guardrails/references/*.md` stay aligned
- Confirm no extra local skills exist under `.codex/skills`; shared skills must be in `C:\Users\marco.meza\.codex\skills`
- Update `Last updated` date in every touched doc

## Publish
- Use `publish.ps1` (outputs to `.publish_tmp` and copies to IIS)
- For release tasks, run `iisreset` after publish

## Last updated
- 2026-02-12
