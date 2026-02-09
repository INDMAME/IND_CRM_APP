# Contributing to Tailwind CSS v4 Skill

## Adding a New Rule

1. Create a markdown file in `rules/` with kebab-case naming:
   - `setup-*.md` - Configuration/setup patterns
   - `migration-*.md` - v3 to v4 migration
   - `customization-*.md` - Custom utilities/variants

2. Use this frontmatter template:

```yaml
---
title: Rule Title
impact: CRITICAL | HIGH | MEDIUM | LOW
impactDescription: One line explaining the impact
tags: comma, separated, tags
---
```

3. Structure the rule content:
   - Start with a brief explanation
   - Show **Incorrect** code first (what agents do wrong)
   - Show **Correct** code (v4 pattern)
   - Add a reference link to official docs

4. Add test cases to `test-cases.json`:

```json
{
  "ruleId": "your-rule-id",
  "ruleTitle": "Rule Title",
  "type": "bad",
  "code": "the bad code",
  "language": "html|css|js",
  "description": "why this is bad"
},
{
  "ruleId": "your-rule-id",
  "ruleTitle": "Rule Title",
  "type": "good",
  "code": "the correct code",
  "language": "html|css|js",
  "description": "why this is correct"
}
```

5. Run the build:

```bash
bun run build      # Compile rules → AGENTS.md
```

## Impact Levels

| Level | Meaning |
|-------|---------|
| CRITICAL | Will error or silently produce no output |
| HIGH | Visual regression or significant behavior change |
| MEDIUM | Should learn for proper v4 usage |
| LOW | Nice to know, edge cases |

## Pull Request Checklist

- [ ] Rule follows frontmatter template
- [ ] Incorrect/Correct examples provided
- [ ] Test cases added to `test-cases.json`
- [ ] `bun run build` succeeds
- [ ] Reference link to official docs included
