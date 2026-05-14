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
- `npm run check:react-doctor`
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
- React Doctor diff gate is clean for changed frontend files, or any remaining findings are unrelated legacy findings explicitly documented in the final response
- Run a short clean-code review on touched files and confirm no obvious low-risk modular refactor was left behind
- If a low-risk modular refactor is still needed, apply it before closure or call out why it was deferred

## Backend (.NET)
- `dotnet build`
- `dotnet test -v minimal`
- Verify MVC routes for Visitas and System
- Confirm OIDC callback and Entra context flow
- For each new `/api/...` endpoint, verify explicit `Program.cs` route map and verb alignment with controller attributes.
- For each new `/api/...` endpoint, validate expected verb returns non-404/non-405 and wrong verb returns intentional 405.
- Verify no new secrets, passwords, tokens, connection strings, base URLs, or other environment-specific values were hardcoded in touched files.
- Run a short clean-code review on touched backend files and confirm responsibilities still follow module ownership and focused object boundaries

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
- Confirm `.codex/skills/ind-crm-frontend-guardrails/SKILL.md` exists and stays as a thin workflow entrypoint instead of duplicating the full root docs
- Confirm no extra local skills exist under `.codex/skills`; shared skills must be in `C:\Users\marco.meza\.codex\skills`
- Update `Last updated` date in every touched doc

## DEV to PROD merge validation
- Run this workflow only when the user explicitly says `merge a prod` or `merge DEV a PROD`; generic publish wording means local IIS publish with `publish.ps1`
- For explicit `merge a prod` requests, confirm the active branch is `DEV`
- Run `git status` and stop if release changes are not fully committed or if unrelated local files are present
- Confirm no local work, commit, merge, fast-forward, or push is being performed directly on `PROD`, `main`, or any production branch
- Determine the latest safe `Release <N>` from merged release PRs, release PR titles, tags, or merge commits before calculating the next number
- Push `DEV` to `origin/DEV` before creating the release PR
- Create the `DEV` -> `PROD` PR with canonical title `Release <N>`
- Attempt PR approval when GitHub permissions allow it, enable auto-merge, and explicitly report self-approval or auto-merge limitations
- Stop and report the blocker if auto-merge cannot be enabled, checks fail, branch protection blocks the PR, or permissions prevent the PR workflow
- Verify the PR is queued for auto-merge or was merged by the protected PR workflow, then confirm local checkout remains on `DEV`
- Final report must include release name, published `DEV` commit, PR URL and status, auto-merge/check status, and GitHub limitations

## Local IIS publish validation
- For `publica`, `publica la web`, `republica`, `publica en iis`, or any web publish/deploy request that does not say `merge a prod`, treat the request as a local web publish only, not as a DEV to PROD release
- Run the required build and validation steps before publishing
- Execute `publish.ps1` to copy the site to IIS
- Run `iisreset` or confirm the publish flow restarted IIS as expected
- Verify the local IIS site is healthy before closing the task

## Publish
- Use `publish.ps1` (outputs to `.publish_tmp` and copies to IIS)
- For release tasks, run `iisreset` after publish

## Last updated
- 2026-05-13
