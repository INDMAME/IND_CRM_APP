#!/usr/bin/env bun

/**
 * LLM Test Runner for Tailwind v4 Skill
 *
 * Usage: bun run test-llm.ts
 *
 * Tests if an LLM can correctly identify bad patterns and suggest good fixes
 * based on the skill content.
 */

import { readFileSync } from 'fs';
import { join } from 'path';

interface TestCase {
  ruleId: string;
  ruleTitle: string;
  type: 'bad' | 'good';
  code: string;
  language: string;
  description: string;
}

const SKILL_DIR = import.meta.dir.replace('/src', '');

async function loadTestCases(): Promise<TestCase[]> {
  const content = readFileSync(join(SKILL_DIR, 'test-cases.json'), 'utf-8');
  return JSON.parse(content);
}

async function loadSkill(): Promise<string> {
  const agentsPath = join(SKILL_DIR, 'AGENTS.md');
  try {
    return readFileSync(agentsPath, 'utf-8');
  } catch {
    console.error('AGENTS.md not found. Run build first.');
    process.exit(1);
  }
}

function groupByRule(cases: TestCase[]): Map<string, { bad: TestCase; good: TestCase }> {
  const grouped = new Map<string, { bad?: TestCase; good?: TestCase }>();

  for (const tc of cases) {
    const existing = grouped.get(tc.ruleId) || {};
    if (tc.type === 'bad') existing.bad = tc;
    if (tc.type === 'good') existing.good = tc;
    grouped.set(tc.ruleId, existing);
  }

  return grouped as Map<string, { bad: TestCase; good: TestCase }>;
}

async function runTest(skill: string, testCase: { bad: TestCase; good: TestCase }): Promise<{
  ruleId: string;
  passed: boolean;
  expected: string;
  actual: string;
}> {
  // This is a placeholder - in real implementation, call an LLM API
  // For now, just return structure for manual testing

  const prompt = `
You are an AI coding agent with the following Tailwind CSS v4 skill:

---
${skill}
---

A developer wrote this code:

\`\`\`${testCase.bad.language}
${testCase.bad.code}
\`\`\`

Is this correct for Tailwind CSS v4? If not, provide the fixed code.

Reply in JSON format:
{
  "isCorrect": boolean,
  "fixedCode": "string or null if correct",
  "reason": "brief explanation"
}
`;

  console.log(`\n📋 Test: ${testCase.bad.ruleTitle}`);
  console.log(`   Bad:  ${testCase.bad.code.replace(/\n/g, ' ').slice(0, 60)}...`);
  console.log(`   Good: ${testCase.good.code.replace(/\n/g, ' ').slice(0, 60)}...`);
  console.log(`   Prompt length: ${prompt.length} chars`);

  return {
    ruleId: testCase.bad.ruleId,
    passed: false, // Placeholder
    expected: testCase.good.code,
    actual: '' // Would be LLM response
  };
}

async function main() {
  console.log('🧪 Tailwind v4 Skill Test Runner\n');

  const testCases = await loadTestCases();
  const skill = await loadSkill();
  const grouped = groupByRule(testCases);

  console.log(`📊 Loaded ${grouped.size} test cases`);
  console.log(`📄 Skill: ${skill.length} characters\n`);

  let passed = 0;
  let failed = 0;

  for (const [ruleId, pair] of grouped) {
    if (!pair.bad || !pair.good) {
      console.log(`⚠️  Skipping ${ruleId} - missing bad/good pair`);
      continue;
    }

    const result = await runTest(skill, pair);

    if (result.passed) {
      passed++;
      console.log(`   ✅ PASS`);
    } else {
      failed++;
      console.log(`   ⏳ PENDING (needs LLM integration)`);
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Results: ${passed}/${passed + failed} passed`);
  console.log(`\nTo run actual LLM tests, integrate with:`);
  console.log(`  - oracle-ai (GPT-5.2 Pro)`);
  console.log(`  - RepoPrompt chat_send`);
  console.log(`  - Direct API calls`);
}

main().catch(console.error);
