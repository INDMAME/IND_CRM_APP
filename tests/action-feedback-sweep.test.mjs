import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { findInlineErrorOutlets } from "../scripts/audit-error-feedback.mjs";

const root = path.resolve(import.meta.dirname, "../Web/wwwroot/react/src");
const sources = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const file = path.join(directory, entry.name);
  return entry.isDirectory() ? sources(file) : /\.tsx?$/.test(file) ? [file] : [];
});

// Prevents browser-native error dialogs from bypassing the localized application popup.
test("application sources have no native alert calls", () => {
  const offenders = sources(root).filter(file => /\b(?:window\.)?alert\s*\(/.test(readFileSync(file, "utf8")));
  assert.deepEqual(offenders.map(file => path.relative(root, file)), []);
});

// Keeps new React error text on the same presenter instead of restoring inline error cards.
test("textual React errors use the shared popup", () => {
  assert.deepEqual(findInlineErrorOutlets(), []);
});

// Checks literal error and validation keys against every supported resource culture.
test("all frontend error keys have nonempty translations in every culture", () => {
  const keys = new Set();
  for (const file of sources(root)) {
    for (const match of readFileSync(file, "utf8").matchAll(/\bind(?:T|Format)\(\s*["']([^"']+)["']/g)) {
      if (/Error|Failed|Validation|PermissionDenied/.test(match[1])) keys.add(match[1]);
    }
  }
  const resources = path.resolve(import.meta.dirname, "../App/Resources/Infrastructure/Localization");
  const failures = [];
  for (const file of readdirSync(resources).filter(name => /^INDSharedResource.*\.resx$/.test(name))) {
    const values = new Map([...readFileSync(path.join(resources, file), "utf8")
      .matchAll(/<data name="([^"]+)"[^>]*>\s*<value>([\s\S]*?)<\/value>/g)].map(match => [match[1], match[2]]));
    for (const key of keys) if (!values.get(key)?.trim() || values.get(key) === key) failures.push(`${file}: ${key}`);
  }
  assert.ok(keys.size > 50, "The guard must cover actual application error keys");
  assert.deepEqual(failures, []);
});
