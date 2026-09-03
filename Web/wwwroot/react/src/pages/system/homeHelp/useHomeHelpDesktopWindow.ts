import React, { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import type { AssistantChatDesktopWindow } from "../../../components/commons/chat/AssistantChatShell.tsx";
import {
  HOME_HELP_DESKTOP_BREAKPOINT_PX,
  HOME_HELP_DESKTOP_EDGE_INSET_PX,
  HOME_HELP_DESKTOP_INITIAL_WIDTH_PX,
  HOME_HELP_DESKTOP_KEYBOARD_STEP_PX,
  clampHomeHelpDesktopWindowRect,
  isHomeHelpDesktopViewport,
  moveHomeHelpDesktopWindowRect,
  resizeHomeHelpDesktopWindowRect,
  type HomeHelpDesktopWindowRect,
} from "./homeHelpDesktopWindowGeometry.ts";

type UseHomeHelpDesktopWindowArgs = {
  isOpen: boolean;
  dialogRef: RefObject<HTMLElement | null>;
  moveAriaLabel: string;
  resizeAriaLabel: string;
};

type HomeHelpDesktopWindowState = {
  position: Pick<HomeHelpDesktopWindowRect, "left" | "top"> | null;
  size: Pick<HomeHelpDesktopWindowRect, "width" | "height"> | null;
};

type HomeHelpDesktopWindowInteraction = {
  mode: "move" | "resize";
  pointerId: number;
  pointerX: number;
  pointerY: number;
  startRect: HomeHelpDesktopWindowRect;
};

const INITIAL_WINDOW_STATE: HomeHelpDesktopWindowState = {
  position: null,
  size: null,
};

const readDesktopViewport = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const readElementRect = (element: HTMLElement): HomeHelpDesktopWindowRect => {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
};

const getInitialDesktopMatch = (): boolean => {
  return typeof window !== "undefined" && isHomeHelpDesktopViewport(window.innerWidth);
};

const getKeyboardDelta = (event: React.KeyboardEvent<HTMLElement>) => {
  const step = event.shiftKey ? HOME_HELP_DESKTOP_KEYBOARD_STEP_PX * 2 : HOME_HELP_DESKTOP_KEYBOARD_STEP_PX;
  switch (event.key) {
    case "ArrowLeft":
      return { x: -step, y: 0 };
    case "ArrowRight":
      return { x: step, y: 0 };
    case "ArrowUp":
      return { x: 0, y: -step };
    case "ArrowDown":
      return { x: 0, y: step };
    default:
      return null;
  }
};

// Owns Home-only desktop movement and resizing without changing the shared mobile drawer.
export const useHomeHelpDesktopWindow = ({
  isOpen,
  dialogRef,
  moveAriaLabel,
  resizeAriaLabel,
}: UseHomeHelpDesktopWindowArgs): AssistantChatDesktopWindow => {
  const [isDesktop, setIsDesktop] = useState(getInitialDesktopMatch);
  const [windowState, setWindowState] = useState<HomeHelpDesktopWindowState>(INITIAL_WINDOW_STATE);
  const [activeInteraction, setActiveInteraction] = useState<HomeHelpDesktopWindowInteraction["mode"] | null>(null);
  const windowStateRef = useRef(windowState);
  const interactionRef = useRef<HomeHelpDesktopWindowInteraction | null>(null);

  const commitWindowState = useCallback((nextState: HomeHelpDesktopWindowState) => {
    windowStateRef.current = nextState;
    setWindowState(nextState);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${HOME_HELP_DESKTOP_BREAKPOINT_PX}px)`);
    const handleChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useLayoutEffect(() => {
    interactionRef.current = null;
    setActiveInteraction(null);
    commitWindowState(INITIAL_WINDOW_STATE);
  }, [commitWindowState, isDesktop, isOpen]);

  const keepWindowInsideViewport = useCallback(() => {
    const panel = dialogRef.current;
    const currentState = windowStateRef.current;
    if (!panel || !currentState.position) {
      return;
    }

    const renderedRect = readElementRect(panel);
    const clampedRect = clampHomeHelpDesktopWindowRect({
      left: currentState.position.left,
      top: currentState.position.top,
      width: currentState.size?.width ?? renderedRect.width,
      height: currentState.size?.height ?? renderedRect.height,
    }, readDesktopViewport());
    commitWindowState({
      position: { left: clampedRect.left, top: clampedRect.top },
      size: currentState.size
        ? { width: clampedRect.width, height: clampedRect.height }
        : null,
    });
  }, [commitWindowState, dialogRef]);

  useEffect(() => {
    if (!isOpen || !isDesktop) {
      return undefined;
    }

    const panel = dialogRef.current;
    window.addEventListener("resize", keepWindowInsideViewport);
    const resizeObserver = panel && typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(keepWindowInsideViewport)
      : null;
    resizeObserver?.observe(panel);

    return () => {
      window.removeEventListener("resize", keepWindowInsideViewport);
      resizeObserver?.disconnect();
    };
  }, [dialogRef, isDesktop, isOpen, keepWindowInsideViewport]);

  const beginPointerInteraction = useCallback((
    mode: HomeHelpDesktopWindowInteraction["mode"],
    event: React.PointerEvent<HTMLElement>
  ) => {
    const panel = dialogRef.current;
    if (!isOpen || !isDesktop || event.button !== 0 || !panel) {
      return;
    }

    event.preventDefault();
    interactionRef.current = {
      mode,
      pointerId: event.pointerId,
      pointerX: event.clientX,
      pointerY: event.clientY,
      startRect: readElementRect(panel),
    };
    setActiveInteraction(mode);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }, [dialogRef, isDesktop, isOpen]);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const interaction = interactionRef.current;
    if (!interaction || interaction.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();
    const delta = {
      x: event.clientX - interaction.pointerX,
      y: event.clientY - interaction.pointerY,
    };
    const nextRect = interaction.mode === "move"
      ? moveHomeHelpDesktopWindowRect(interaction.startRect, delta, readDesktopViewport())
      : resizeHomeHelpDesktopWindowRect(interaction.startRect, delta, readDesktopViewport());
    const currentState = windowStateRef.current;
    commitWindowState({
      position: { left: nextRect.left, top: nextRect.top },
      size: interaction.mode === "resize"
        ? { width: nextRect.width, height: nextRect.height }
        : currentState.size,
    });
  }, [commitWindowState]);

  const finishPointerInteraction = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const interaction = interactionRef.current;
    if (!interaction || interaction.pointerId !== event.pointerId) {
      return;
    }

    interactionRef.current = null;
    setActiveInteraction(null);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    }
  }, []);

  const handleLostPointerCapture = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (interactionRef.current?.pointerId === event.pointerId) {
      interactionRef.current = null;
      setActiveInteraction(null);
    }
  }, []);

  const moveWithKeyboard = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    const panel = dialogRef.current;
    const delta = getKeyboardDelta(event);
    if (!isDesktop || !panel || !delta) {
      return;
    }

    event.preventDefault();
    const nextRect = moveHomeHelpDesktopWindowRect(readElementRect(panel), delta, readDesktopViewport());
    commitWindowState({
      position: { left: nextRect.left, top: nextRect.top },
      size: windowStateRef.current.size,
    });
  }, [commitWindowState, dialogRef, isDesktop]);

  const resizeWithKeyboard = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    const panel = dialogRef.current;
    const delta = getKeyboardDelta(event);
    if (!isDesktop || !panel || !delta) {
      return;
    }

    event.preventDefault();
    const nextRect = resizeHomeHelpDesktopWindowRect(readElementRect(panel), delta, readDesktopViewport());
    commitWindowState({
      position: { left: nextRect.left, top: nextRect.top },
      size: { width: nextRect.width, height: nextRect.height },
    });
  }, [commitWindowState, dialogRef, isDesktop]);

  const panelStyle = isDesktop
    ? {
        width: windowState.size?.width ?? HOME_HELP_DESKTOP_INITIAL_WIDTH_PX,
        height: windowState.size?.height,
        maxWidth: `calc(100vw - ${HOME_HELP_DESKTOP_EDGE_INSET_PX * 2}px)`,
        maxHeight: `calc(100dvh - ${HOME_HELP_DESKTOP_EDGE_INSET_PX * 2}px)`,
        left: windowState.position?.left ?? "auto",
        top: windowState.position?.top ?? "auto",
        right: windowState.position ? "auto" : HOME_HELP_DESKTOP_EDGE_INSET_PX,
        bottom: windowState.position ? "auto" : HOME_HELP_DESKTOP_EDGE_INSET_PX,
      }
    : undefined;

  return {
    panelStyle,
    isInteracting: activeInteraction !== null,
    moveHandle: {
      ariaLabel: moveAriaLabel,
      onPointerDown: (event) => beginPointerInteraction("move", event),
      onPointerMove: handlePointerMove,
      onPointerUp: finishPointerInteraction,
      onPointerCancel: finishPointerInteraction,
      onLostPointerCapture: handleLostPointerCapture,
      onKeyDown: moveWithKeyboard,
    },
    resizeHandle: {
      ariaLabel: resizeAriaLabel,
      onPointerDown: (event) => beginPointerInteraction("resize", event),
      onPointerMove: handlePointerMove,
      onPointerUp: finishPointerInteraction,
      onPointerCancel: finishPointerInteraction,
      onLostPointerCapture: handleLostPointerCapture,
      onKeyDown: resizeWithKeyboard,
    },
  };
};
