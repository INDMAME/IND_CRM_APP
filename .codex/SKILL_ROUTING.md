# Skill routing for IND_CRM_APP

## Purpose
- Single routing matrix for all installed skills in this environment.
- Defines when each skill must be loaded in addition to project guardrails.

## Mandatory routing rules
1. For any code, config, documentation, review, or release task inside this repository, always load `ind-crm-frontend-guardrails` first.
2. Match the task against the matrix below and load every skill whose trigger applies.
3. If multiple skills apply, use the minimal set and run them in a clear order.
4. If no additional trigger applies, continue with `ind-crm-frontend-guardrails` only.
5. Tailwind helper skills are advisory only. Project style rules in `.codex/AGENTS.md` and `.codex/UI_GUIDE.md` are mandatory and take precedence.
6. When editing `.codex` docs or skill docs, `writing-skills` is required and root `.codex/*.md` is the source of truth.

## Installed skills matrix

| Skill | Use when | Level |
|---|---|---|
| `ind-crm-frontend-guardrails` | Repository-local change, review, documentation, config, or release in IND_CRM_APP where project guardrails must apply. | Required on repo-local implementation scope |
| `brainstorming` | Before creative work: new features, behavior changes, component design. | Required on creative tasks |
| `writing-skills` | Creating, editing, or validating skill content and `.codex` guardrail docs. | Required on skill/doc rule work |
| `react-doctor` | Closing React or frontend tasks, reviewing frontend best practices, or validating changed React files before delivery. | Required before delivery when frontend source or build inputs changed |
| `systematic-debugging` | Any bug, test failure, or unexpected behavior before proposing fixes. | Required on debugging |
| `vercel-react-best-practices` | React/TS/TSX rendering, data flow, listeners, bundle, performance tasks. | Required on React tasks |
| `vercel-composition-patterns` | Refactoring React component APIs, composition, render props, context, boolean prop cleanup. | Required when component API design is involved |
| `code-reviewer` | Code or architecture review requests focused on risks, regressions, maintainability, or security findings. | Required on review/audit requests |
| `web-design-guidelines` | UI review, accessibility audit, UX or design compliance review. | Required on UI audit requests |
| `tailwindcss-v4` | Tailwind CSS v4 utility or config syntax questions, migration checks, and compatibility reviews. | Optional helper only |
| `tailwind-patterns` | Tailwind component/layout pattern discovery when implementing UI details. | Optional helper only |
| `stride-analysis-patterns` | STRIDE threat modeling and systematic threat discovery. | Required for security analysis |
| `attack-tree-construction` | Building attack trees to visualize threat paths and defense gaps. | Required when attack trees are requested |
| `security-requirement-extraction` | Turning threat findings into actionable requirements or security stories. | Required after threat analysis |
| `threat-mitigation-mapping` | Mapping threats to controls, mitigations, and remediation priorities. | Required during mitigation planning |
| `sast-configuration` | Configuring static security scanning in development or CI/CD. | Required when enabling security automation |
| `vercel-react-native-skills` | React Native or Expo tasks. | Required on RN/Expo tasks |
| `find-skills` | User asks to discover skill capabilities. | Required on skill discovery requests |
| `skill-installer` | User asks to install skills from curated list or repository. | Required on skill installation requests |
| `skill-creator` | User asks to create or update a reusable skill package. | Required on skill authoring requests |

## Security sequence (default)
1. `stride-analysis-patterns`
2. `attack-tree-construction`
3. `security-requirement-extraction`
4. `threat-mitigation-mapping`
5. `sast-configuration` (when automation is in scope)

## Notes
- Project-local required skill path: `.codex/skills/ind-crm-frontend-guardrails/SKILL.md`.
- Keep only `ind-crm-frontend-guardrails` under `.codex/skills`.
- Shared helper skills path: `C:\Users\marco.meza\.codex\skills`.
- The local skill must stay thin: workflow in `SKILL.md`, detailed rules in root `.codex/*.md`, mirrored through `references/`.
- Run React Doctor through `npm run check:react-doctor` so repo-specific ignore rules in `react-doctor.config.json` are applied.
- Routing is trigger-based: skills should be loaded when task context matches, not by manual preference.
- Never let `tailwindcss-v4` or `tailwind-patterns` override the project visual language: Montserrat, primary `#00296b`, Heroicons, and existing component contracts.
- After editing `.codex/*.md` or `.codex/config.toml`, run `npm run sync:skill:local:references` (also enforced by pre-commit).

## Last updated
- 2026-03-27
