import assert from "node:assert/strict";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const repoRoot = resolve(import.meta.dirname, "..");
const scriptPath = join(repoRoot, "scripts", "preserve-static-chunks.ps1");

const chunkDirectory = (root) => join(root, "wwwroot", "js", "chunks");

// Creates a minimal generated chunk fixture.
const writeChunk = (root, name) => {
  const directory = chunkDirectory(root);
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, name), `export const chunk = "${name}";\n`, "utf8");
};

// Executes the same retention helper used by the IIS publish flow.
const runRetention = (publishRoot, iisRoot) => {
  const result = spawnSync(
    "powershell.exe",
    [
      "-NoProfile",
      "-ExecutionPolicy",
      "Bypass",
      "-File",
      scriptPath,
      "-PublishOutputPath",
      publishRoot,
      "-IisPath",
      iisRoot,
    ],
    { cwd: repoRoot, encoding: "utf8" }
  );

  assert.equal(result.status, 0, result.stderr || result.stdout);
};

test("publish retention keeps exactly the current and immediately previous chunk generations", () => {
  const fixtureRoot = mkdtempSync(join(tmpdir(), "ind-static-chunks-"));
  const iisRoot = join(fixtureRoot, "iis");
  const firstPublishRoot = join(fixtureRoot, "publish-one");
  const secondPublishRoot = join(fixtureRoot, "publish-two");

  try {
    writeChunk(iisRoot, "chunk-OLDGEN01.js");
    writeChunk(firstPublishRoot, "chunk-NEWGEN01.js");
    runRetention(firstPublishRoot, iisRoot);

    assert.equal(existsSync(join(chunkDirectory(firstPublishRoot), "chunk-OLDGEN01.js")), true);
    assert.equal(existsSync(join(chunkDirectory(firstPublishRoot), "chunk-NEWGEN01.js")), true);

    rmSync(iisRoot, { recursive: true, force: true });
    cpSync(firstPublishRoot, iisRoot, { recursive: true });

    writeChunk(secondPublishRoot, "chunk-NEXTGEN1.js");
    runRetention(secondPublishRoot, iisRoot);

    assert.equal(existsSync(join(chunkDirectory(secondPublishRoot), "chunk-NEXTGEN1.js")), true);
    assert.equal(existsSync(join(chunkDirectory(secondPublishRoot), "chunk-NEWGEN01.js")), true);
    assert.equal(existsSync(join(chunkDirectory(secondPublishRoot), "chunk-OLDGEN01.js")), false);

    const manifest = JSON.parse(readFileSync(join(secondPublishRoot, "ind-static-chunks-v1.json"), "utf8"));
    assert.deepEqual(manifest.files, ["chunk-NEXTGEN1.js"]);
  } finally {
    rmSync(fixtureRoot, { recursive: true, force: true });
  }
});

test("publish retention ignores unsafe names from a deployed manifest", () => {
  const fixtureRoot = mkdtempSync(join(tmpdir(), "ind-static-chunks-safety-"));
  const iisRoot = join(fixtureRoot, "iis");
  const publishRoot = join(fixtureRoot, "publish");

  try {
    writeChunk(iisRoot, "chunk-SAFE0001.js");
    writeChunk(publishRoot, "chunk-CURRENT1.js");
    const deployedJsRoot = join(iisRoot, "wwwroot", "js");
    mkdirSync(deployedJsRoot, { recursive: true });
    writeFileSync(join(deployedJsRoot, "escape-EVIL0001.js"), "export const escaped = true;\n", "utf8");
    writeFileSync(join(deployedJsRoot, "escape-EVIL0002.js"), "export const escaped = true;\n", "utf8");
    writeFileSync(
      join(iisRoot, "ind-static-chunks-v1.json"),
      JSON.stringify({
        version: 1,
        files: ["../escape-EVIL0001.js", "..\\escape-EVIL0002.js", "chunk-SAFE0001.js"],
      }),
      "utf8"
    );

    runRetention(publishRoot, iisRoot);

    assert.equal(existsSync(join(chunkDirectory(publishRoot), "chunk-SAFE0001.js")), true);
    assert.equal(existsSync(join(publishRoot, "wwwroot", "js", "escape-EVIL0001.js")), false);
    assert.equal(existsSync(join(publishRoot, "wwwroot", "js", "escape-EVIL0002.js")), false);
  } finally {
    rmSync(fixtureRoot, { recursive: true, force: true });
  }
});

test("publish retention safely falls back when the deployed manifest is corrupt", () => {
  const fixtureRoot = mkdtempSync(join(tmpdir(), "ind-static-chunks-corrupt-"));
  const iisRoot = join(fixtureRoot, "iis");
  const publishRoot = join(fixtureRoot, "publish");

  try {
    writeChunk(iisRoot, "chunk-PREVIOUS.js");
    writeChunk(publishRoot, "chunk-CURRENT2.js");
    writeFileSync(join(iisRoot, "ind-static-chunks-v1.json"), "{invalid", "utf8");

    runRetention(publishRoot, iisRoot);

    assert.equal(existsSync(join(chunkDirectory(publishRoot), "chunk-PREVIOUS.js")), true);
    assert.equal(existsSync(join(chunkDirectory(publishRoot), "chunk-CURRENT2.js")), true);
  } finally {
    rmSync(fixtureRoot, { recursive: true, force: true });
  }
});

test("publish retention falls back when a parsed manifest has no usable files", () => {
  const fixtureRoot = mkdtempSync(join(tmpdir(), "ind-static-chunks-empty-"));
  const iisRoot = join(fixtureRoot, "iis");
  const publishRoot = join(fixtureRoot, "publish");

  try {
    writeChunk(iisRoot, "chunk-PREV0002.js");
    writeChunk(publishRoot, "chunk-CURRENT3.js");
    writeFileSync(
      join(iisRoot, "ind-static-chunks-v1.json"),
      JSON.stringify({ version: 1, files: {} }),
      "utf8"
    );

    runRetention(publishRoot, iisRoot);

    assert.equal(existsSync(join(chunkDirectory(publishRoot), "chunk-PREV0002.js")), true);
    assert.equal(existsSync(join(chunkDirectory(publishRoot), "chunk-CURRENT3.js")), true);
  } finally {
    rmSync(fixtureRoot, { recursive: true, force: true });
  }
});

test("publish retention never overwrites a current chunk with deployed content", () => {
  const fixtureRoot = mkdtempSync(join(tmpdir(), "ind-static-chunks-overlap-"));
  const iisRoot = join(fixtureRoot, "iis");
  const publishRoot = join(fixtureRoot, "publish");
  const overlappingChunk = "chunk-SHARED01.js";

  try {
    writeChunk(iisRoot, overlappingChunk);
    writeChunk(publishRoot, overlappingChunk);
    const publishedChunkPath = join(chunkDirectory(publishRoot), overlappingChunk);
    writeFileSync(publishedChunkPath, "export const source = \"current\";\n", "utf8");

    runRetention(publishRoot, iisRoot);

    assert.equal(readFileSync(publishedChunkPath, "utf8"), "export const source = \"current\";\n");
  } finally {
    rmSync(fixtureRoot, { recursive: true, force: true });
  }
});

test("publish validates retention and runs it between artifact creation and IIS mirroring", () => {
  const publishSource = readFileSync(join(repoRoot, "publish.ps1"), "utf8");
  const publishIndex = publishSource.indexOf("dotnet publish $ProjectPath");
  const retentionIndex = publishSource.indexOf("scripts\\preserve-static-chunks.ps1");
  const deployIndex = publishSource.lastIndexOf("Invoke-CleanIisDeploy -SourcePath");

  assert.match(publishSource, /npm run test:static-chunks/u);
  assert.ok(publishIndex >= 0, "dotnet publish command is missing");
  assert.ok(retentionIndex > publishIndex, "chunk retention must run after dotnet publish");
  assert.ok(deployIndex > retentionIndex, "chunk retention must run before IIS mirroring");
});
