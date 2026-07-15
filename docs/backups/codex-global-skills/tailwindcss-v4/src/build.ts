#!/usr/bin/env bun

/**
 * Build script for Tailwind v4 Skill
 *
 * Compiles rules/*.md → AGENTS.md
 * Following Vercel's agent-skills pattern
 */

import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const SKILL_DIR = import.meta.dir.replace('/src', '')
const RULES_DIR = join(SKILL_DIR, 'rules')
const OUTPUT = join(SKILL_DIR, 'AGENTS.md')

interface RuleFrontmatter {
  title: string
  impact: 'HIGH' | 'MEDIUM' | 'LOW'
  impactDescription: string
  tags: string
}

function parseFrontmatter(content: string): { frontmatter: RuleFrontmatter; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    throw new Error('Invalid frontmatter')
  }

  const yaml = match[1]
  const body = match[2].trim()

  const frontmatter: RuleFrontmatter = {
    title: '',
    impact: 'MEDIUM',
    impactDescription: '',
    tags: ''
  }

  for (const line of yaml.split('\n')) {
    const [key, ...valueParts] = line.split(':')
    const value = valueParts.join(':').trim()
    if (key && value) {
      (frontmatter as any)[key.trim()] = value
    }
  }

  return { frontmatter, body }
}

function loadMetadata() {
  const path = join(SKILL_DIR, 'metadata.json')
  return JSON.parse(readFileSync(path, 'utf-8'))
}

function buildAgentsMd() {
  const metadata = loadMetadata()
  const ruleFiles = readdirSync(RULES_DIR).filter(f => f.endsWith('.md')).sort()

  const rules: Array<{ frontmatter: RuleFrontmatter; body: string; file: string }> = []

  for (const file of ruleFiles) {
    const content = readFileSync(join(RULES_DIR, file), 'utf-8')
    const { frontmatter, body } = parseFrontmatter(content)
    rules.push({ frontmatter, body, file })
  }

  // Group by category
  const setupRules = rules.filter(r => r.file.startsWith('setup-'))
  const migrationRules = rules.filter(r => r.file.startsWith('migration-'))
  const customizationRules = rules.filter(r => r.file.startsWith('customization-'))

  const output = `# Tailwind CSS v4 Skill

> ${metadata.abstract}

**Version**: ${metadata.version} | **Status**: ${metadata.status} | **Last Verified**: ${metadata.testStatus.lastRun}
**Source**: [tailwindlabs/tailwindcss](${metadata.sourceRepo})

---

## Quick Reference

### v4 Entry Point
\`\`\`css
@import "tailwindcss";
\`\`\`

### Key Directives
| Directive | Purpose |
|-----------|---------|
| \`@theme\` | Define design tokens (colors, spacing, fonts) |
| \`@utility\` | Create custom utility classes |
| \`@variant\` | Define custom variants (hover, focus, etc.) |
| \`@source\` | Control class detection and safelisting |
| \`@reference\` | Import for @apply without emitting CSS |

---

## Setup & Configuration

${setupRules.map(r => r.body).join('\n\n---\n\n')}

---

## Migration from v3

${migrationRules.map(r => r.body).join('\n\n---\n\n')}

---

## Customization

${customizationRules.map(r => r.body).join('\n\n---\n\n')}

---

## References

${metadata.references.map((r: string) => `- ${r}`).join('\n')}

---

*Generated from ${rules.length} rules. Verified ${metadata.testStatus.passing}/${metadata.testStatus.totalCases} tests passing.*
`

  writeFileSync(OUTPUT, output)
  console.log(`✅ Built AGENTS.md (${output.length} chars, ${rules.length} rules)`)
}

buildAgentsMd()
