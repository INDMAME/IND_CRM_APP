import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { build } from "esbuild";

const repoRoot = path.resolve(import.meta.dirname, "..");
const geometryBundle = await build({
  entryPoints: [path.join(
    repoRoot,
    "Web",
    "wwwroot",
    "react",
    "src",
    "pages",
    "system",
    "homeHelp",
    "homeHelpDesktopWindowGeometry.ts"
  )],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
  logLevel: "silent",
});
const geometryModuleUrl = `data:text/javascript;base64,${Buffer.from(geometryBundle.outputFiles[0]?.text || "").toString("base64")}`;
const {
  HOME_HELP_DESKTOP_INITIAL_WIDTH_PX,
  HOME_HELP_DESKTOP_STANDARD_WIDTH_PX,
  clampHomeHelpDesktopWindowRect,
  isHomeHelpDesktopViewport,
  moveHomeHelpDesktopWindowRect,
  resizeHomeHelpDesktopWindowRect,
} = await import(geometryModuleUrl);

const desktopViewport = { width: 1920, height: 1080 };
const initialDesktopRect = { left: 1168, top: 424, width: 736, height: 640 };

test("Home desktop assistant starts at exactly twice the shared chat width", () => {
  assert.equal(HOME_HELP_DESKTOP_STANDARD_WIDTH_PX, 368);
  assert.equal(HOME_HELP_DESKTOP_INITIAL_WIDTH_PX, 736);
  assert.deepEqual(clampHomeHelpDesktopWindowRect(initialDesktopRect, desktopViewport), initialDesktopRect);
  assert.deepEqual(
    clampHomeHelpDesktopWindowRect({ left: 272, top: 16, width: 736, height: 640 }, { width: 1024, height: 900 }),
    { left: 272, top: 16, width: 736, height: 640 }
  );
});

test("Home desktop assistant uses the project desktop breakpoint", () => {
  assert.equal(isHomeHelpDesktopViewport(1024), true);
  assert.equal(isHomeHelpDesktopViewport(1023), false);
});

test("moving the Home assistant keeps every edge inside the viewport", () => {
  assert.deepEqual(
    moveHomeHelpDesktopWindowRect(initialDesktopRect, { x: -4000, y: -4000 }, desktopViewport),
    { ...initialDesktopRect, left: 16, top: 16 }
  );
  assert.deepEqual(
    moveHomeHelpDesktopWindowRect(initialDesktopRect, { x: 4000, y: 4000 }, desktopViewport),
    initialDesktopRect
  );
});

test("resizing the Home assistant respects minimum and viewport dimensions", () => {
  assert.deepEqual(
    resizeHomeHelpDesktopWindowRect(initialDesktopRect, { x: -4000, y: -4000 }, desktopViewport),
    { left: 1168, top: 424, width: 368, height: 420 }
  );
  assert.deepEqual(
    resizeHomeHelpDesktopWindowRect(initialDesktopRect, { x: 4000, y: 4000 }, desktopViewport),
    { left: 16, top: 16, width: 1888, height: 1048 }
  );
});

test("pointer deltas remain relative to one stable interaction snapshot", () => {
  const startRect = { left: 100, top: 100, width: 736, height: 640 };
  assert.equal(moveHomeHelpDesktopWindowRect(startRect, { x: 20, y: 0 }, desktopViewport).left, 120);
  assert.equal(moveHomeHelpDesktopWindowRect(startRect, { x: 40, y: 0 }, desktopViewport).left, 140);
});
