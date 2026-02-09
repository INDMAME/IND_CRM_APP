# Quality Checklist (IND_CRM_APP)

## Purpose
- Single place for validation steps before publish or review.

## Frontend (React + Tailwind)
- npm run build (react + css)
- Release build: npm run build:react:prod and npm run build:css
- Verify: create, detail, history, text editor, audio recorder
- Critical: date filters, dropdowns, permissions, action mark
- Read-only color contract verified per COMPONENT_CONTRACTS.md
- Verify ESM loading: each Razor page uses script type="module" and /js/chunks/* assets resolve without 404.

## Backend (.NET)
- dotnet build
- Verify MVC routes for Visitas and System
- Confirm OIDC callback and Entra context flow

## Regression checks
- Date range selection works (from/to focus and payload format)
- Permission modal still triggers on 403
- SessionStorage keys preserved
- Read-only fields match color contract (label #00296be0, value #64748b)
- If E2E uses Playwright, ensure auth flow is valid for current login mode (Entra/SSO or local form login).

## Publish
- Use publish.ps1 (outputs to .publish_tmp and copies to IIS)

## Last updated
- 2026-02-09
