#!/usr/bin/env bun

/**
 * UNFAKEABLE Tailwind v4 Skill Validator
 *
 * Trust layers:
 * 1. EXECUTION - Actually runs Tailwind CLI (exit code cannot lie)
 * 2. SOURCE    - Greps actual repo files (text is either there or not)
 *
 * NO AI OPINIONS. Only facts.
 */

import { $ } from 'bun'
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'fs'
import { join } from 'path'

const TAILWIND_REPO = '/Users/greenapple/Code/OpenSources/tailwindcss'
const TEST_DIR = '/tmp/tailwind-skill-validation'

interface ExecutionTest {
  id: string
  name: string
  type: 'must-compile' | 'must-error'
  css: string
  needsPackage?: boolean  // If true, needs tailwindcss installed
}

// Create a proper test environment with tailwindcss installed
async function setupTestEnv() {
  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { recursive: true })
  }
  mkdirSync(TEST_DIR, { recursive: true })

  // Create package.json
  writeFileSync(join(TEST_DIR, 'package.json'), JSON.stringify({
    name: 'tailwind-test',
    type: 'module',
    dependencies: {
      tailwindcss: '^4.1.18'
    }
  }, null, 2))

  // Install tailwindcss
  console.log('   Installing tailwindcss in test environment...')
  await $`cd ${TEST_DIR} && npm install --silent`.quiet()
}

// Execution tests - MUST match reality
const EXECUTION_TESTS: ExecutionTest[] = [
  // === V4 PATTERNS THAT MUST WORK ===
  {
    id: 'v4-import',
    name: '@import "tailwindcss" works',
    type: 'must-compile',
    css: `@import "tailwindcss";`,
    needsPackage: true
  },
  {
    id: 'v4-theme',
    name: '@theme block works',
    type: 'must-compile',
    css: `@import "tailwindcss";\n@theme {\n  --color-brand: #ff6b00;\n}`,
    needsPackage: true
  },
  {
    id: 'v4-utility',
    name: '@utility directive works',
    type: 'must-compile',
    css: `@import "tailwindcss";\n@utility my-util {\n  content-visibility: auto;\n}`,
    needsPackage: true
  },
  {
    id: 'v4-variant',
    name: '@variant directive works',
    type: 'must-compile',
    css: `@import "tailwindcss";\n@variant hocus (&:hover, &:focus);`,
    needsPackage: true
  },
  {
    id: 'v4-source-inline',
    name: '@source inline works',
    type: 'must-compile',
    css: `@import "tailwindcss";\n@source inline("bg-red-500");`,
    needsPackage: true
  },
  {
    id: 'v4-reference',
    name: '@reference works for @apply',
    type: 'must-compile',
    css: `@reference "tailwindcss";\n.btn { @apply bg-blue-500; }`,
    needsPackage: true
  },

  // === V3 COMPAT (still works in v4, but not recommended) ===
  {
    id: 'v3-tailwind-base',
    name: '@tailwind base (v3 compat) works',
    type: 'must-compile',
    css: `@tailwind base;`,
    needsPackage: true
  },

  // === THINGS THAT MUST ERROR ===
  {
    id: 'theme-with-selector',
    name: 'selector inside @theme errors',
    type: 'must-error',
    css: `@import "tailwindcss";\n@theme {\n  .foo { --color-x: red; }\n}`,
    needsPackage: true
  }
]

// Source verification - what patterns exist in the repo
const SOURCE_CHECKS = [
  {
    claim: 'createPlugin exists',
    path: 'packages/tailwindcss/src/plugin.ts',
    pattern: 'createPlugin'
  },
  {
    claim: '@theme is handled',
    path: 'packages/tailwindcss/src',
    pattern: '@theme'
  },
  {
    claim: '@utility is handled',
    path: 'packages/tailwindcss/src',
    pattern: '@utility'
  },
  {
    claim: '@variant is handled',
    path: 'packages/tailwindcss/src',
    pattern: '@variant'
  },
  {
    claim: '@source is handled',
    path: 'packages/tailwindcss/src',
    pattern: '@source'
  },
  {
    claim: 'shadow-sm utility exists',
    path: 'packages/tailwindcss',
    pattern: 'shadow-sm'
  },
  {
    claim: 'ring width utilities exist',
    path: 'packages/tailwindcss',
    pattern: 'ring-'
  }
]

async function runExecutionTest(test: ExecutionTest): Promise<{
  passed: boolean
  reason: string
}> {
  const inputFile = join(TEST_DIR, `${test.id}.css`)
  const outputFile = join(TEST_DIR, `${test.id}-out.css`)

  writeFileSync(inputFile, test.css)

  try {
    await $`cd ${TEST_DIR} && tailwindcss -i ${inputFile} -o ${outputFile} 2>&1`.quiet()

    if (test.type === 'must-error') {
      return { passed: false, reason: 'Expected error but compiled successfully' }
    }
    return { passed: true, reason: 'Compiled' }
  } catch (error: any) {
    const msg = error.stderr?.toString() || error.message || ''

    if (test.type === 'must-error') {
      return { passed: true, reason: `Errored: ${msg.slice(0, 50)}` }
    }
    return { passed: false, reason: `Error: ${msg.slice(0, 100)}` }
  }
}

async function runSourceCheck(check: { claim: string; path: string; pattern: string }): Promise<{
  passed: boolean
  reason: string
}> {
  const fullPath = join(TAILWIND_REPO, check.path)

  try {
    const result = await $`grep -r "${check.pattern}" ${fullPath}`.quiet()
    const found = result.stdout.toString().trim().length > 0
    return found
      ? { passed: true, reason: 'Found in source' }
      : { passed: false, reason: 'Not found' }
  } catch {
    return { passed: false, reason: 'Not found' }
  }
}

async function main() {
  console.log('\n' + '='.repeat(60))
  console.log('  UNFAKEABLE TAILWIND v4 SKILL VALIDATOR')
  console.log('  Real execution. Real source grep. No AI opinions.')
  console.log('='.repeat(60) + '\n')

  // Check prerequisites
  if (!existsSync(TAILWIND_REPO)) {
    console.error(`✗ Tailwind repo not found: ${TAILWIND_REPO}`)
    process.exit(1)
  }

  try {
    await $`which tailwindcss`.quiet()
    console.log('✓ Tailwind CLI found')
  } catch {
    console.error('✗ Tailwind CLI not found')
    process.exit(1)
  }

  // Setup test environment
  console.log('✓ Setting up test environment...')
  await setupTestEnv()
  console.log('✓ Test environment ready\n')

  // === EXECUTION TESTS ===
  console.log('📋 LAYER 1: EXECUTION TESTS')
  console.log('   (Running real Tailwind CLI - exit codes don\'t lie)\n')

  let execPass = 0, execFail = 0
  const execFailures: string[] = []

  for (const test of EXECUTION_TESTS) {
    const result = await runExecutionTest(test)
    if (result.passed) {
      console.log(`   ✅ ${test.name}`)
      execPass++
    } else {
      console.log(`   ❌ ${test.name}`)
      console.log(`      └─ ${result.reason}`)
      execFail++
      execFailures.push(`${test.name}: ${result.reason}`)
    }
  }

  // === SOURCE CHECKS ===
  console.log('\n📋 LAYER 2: SOURCE VERIFICATION')
  console.log('   (Grepping actual repo - text exists or it doesn\'t)\n')

  let srcPass = 0, srcFail = 0
  const srcFailures: string[] = []

  for (const check of SOURCE_CHECKS) {
    const result = await runSourceCheck(check)
    if (result.passed) {
      console.log(`   ✅ ${check.claim}`)
      srcPass++
    } else {
      console.log(`   ❌ ${check.claim}`)
      srcFail++
      srcFailures.push(check.claim)
    }
  }

  // === SUMMARY ===
  const totalPass = execPass + srcPass
  const totalTests = EXECUTION_TESTS.length + SOURCE_CHECKS.length
  const pct = Math.round((totalPass / totalTests) * 100)

  console.log('\n' + '='.repeat(60))
  console.log('  RESULTS')
  console.log('='.repeat(60))
  console.log(`\n  Execution: ${execPass}/${EXECUTION_TESTS.length}`)
  console.log(`  Source:    ${srcPass}/${SOURCE_CHECKS.length}`)
  console.log(`  ────────────────────`)
  console.log(`  TOTAL:     ${totalPass}/${totalTests} (${pct}%)`)

  if (execFailures.length + srcFailures.length > 0) {
    console.log('\n  ❌ FAILURES:')
    for (const f of [...execFailures, ...srcFailures]) {
      console.log(`     • ${f}`)
    }
  }

  console.log('\n' + '='.repeat(60))
  if (pct === 100) {
    console.log('  ✅ ALL TESTS PASS - VERIFIED')
  } else if (pct >= 80) {
    console.log('  ⚠️  MOSTLY PASSING - Review failures')
  } else {
    console.log('  ❌ NEEDS WORK')
  }
  console.log('='.repeat(60) + '\n')

  process.exit(pct === 100 ? 0 : 1)
}

main().catch(console.error)
