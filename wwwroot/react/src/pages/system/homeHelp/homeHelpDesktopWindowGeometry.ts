export const HOME_HELP_DESKTOP_BREAKPOINT_PX = 1024;
export const HOME_HELP_DESKTOP_STANDARD_WIDTH_PX = 368;
export const HOME_HELP_DESKTOP_INITIAL_WIDTH_PX = HOME_HELP_DESKTOP_STANDARD_WIDTH_PX * 2;
export const HOME_HELP_DESKTOP_MIN_HEIGHT_PX = 420;
export const HOME_HELP_DESKTOP_EDGE_INSET_PX = 16;
export const HOME_HELP_DESKTOP_KEYBOARD_STEP_PX = 16;

export type HomeHelpDesktopViewport = {
  width: number;
  height: number;
};

export type HomeHelpDesktopWindowRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type HomeHelpDesktopWindowDelta = {
  x: number;
  y: number;
};

const clamp = (value: number, minimum: number, maximum: number): number => {
  return Math.min(Math.max(value, minimum), maximum);
};

const toSafeDimension = (value: number): number => {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
};

// Reports whether the viewport uses the project desktop breakpoint.
export const isHomeHelpDesktopViewport = (viewportWidth: number): boolean => {
  return toSafeDimension(viewportWidth) >= HOME_HELP_DESKTOP_BREAKPOINT_PX;
};

// Keeps a movable assistant rectangle fully inside the visible desktop viewport.
export const clampHomeHelpDesktopWindowRect = (
  rect: HomeHelpDesktopWindowRect,
  viewport: HomeHelpDesktopViewport
): HomeHelpDesktopWindowRect => {
  const viewportWidth = toSafeDimension(viewport.width);
  const viewportHeight = toSafeDimension(viewport.height);
  const availableWidth = Math.max(0, viewportWidth - (HOME_HELP_DESKTOP_EDGE_INSET_PX * 2));
  const availableHeight = Math.max(0, viewportHeight - (HOME_HELP_DESKTOP_EDGE_INSET_PX * 2));
  const minimumWidth = Math.min(HOME_HELP_DESKTOP_STANDARD_WIDTH_PX, availableWidth);
  const minimumHeight = Math.min(HOME_HELP_DESKTOP_MIN_HEIGHT_PX, availableHeight);
  const width = clamp(toSafeDimension(rect.width), minimumWidth, availableWidth);
  const height = clamp(toSafeDimension(rect.height), minimumHeight, availableHeight);
  const maximumLeft = Math.max(HOME_HELP_DESKTOP_EDGE_INSET_PX, viewportWidth - HOME_HELP_DESKTOP_EDGE_INSET_PX - width);
  const maximumTop = Math.max(HOME_HELP_DESKTOP_EDGE_INSET_PX, viewportHeight - HOME_HELP_DESKTOP_EDGE_INSET_PX - height);

  return {
    left: clamp(Number.isFinite(rect.left) ? rect.left : HOME_HELP_DESKTOP_EDGE_INSET_PX, HOME_HELP_DESKTOP_EDGE_INSET_PX, maximumLeft),
    top: clamp(Number.isFinite(rect.top) ? rect.top : HOME_HELP_DESKTOP_EDGE_INSET_PX, HOME_HELP_DESKTOP_EDGE_INSET_PX, maximumTop),
    width,
    height,
  };
};

// Applies a pointer or keyboard movement from one stable interaction snapshot.
export const moveHomeHelpDesktopWindowRect = (
  startRect: HomeHelpDesktopWindowRect,
  delta: HomeHelpDesktopWindowDelta,
  viewport: HomeHelpDesktopViewport
): HomeHelpDesktopWindowRect => {
  return clampHomeHelpDesktopWindowRect({
    ...startRect,
    left: startRect.left + delta.x,
    top: startRect.top + delta.y,
  }, viewport);
};

// Applies a bottom-right resize while preserving the desktop viewport bounds.
export const resizeHomeHelpDesktopWindowRect = (
  startRect: HomeHelpDesktopWindowRect,
  delta: HomeHelpDesktopWindowDelta,
  viewport: HomeHelpDesktopViewport
): HomeHelpDesktopWindowRect => {
  return clampHomeHelpDesktopWindowRect({
    ...startRect,
    width: startRect.width + delta.x,
    height: startRect.height + delta.y,
  }, viewport);
};
