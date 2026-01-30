import React from "react";
import { hidePreviewTooltip } from "../utils/previewTooltip.ts";

type TapHandler = (event: React.PointerEvent) => void;
type HoldHandler = (target: HTMLElement, clientY: number) => boolean | void;

type Options = {
  movePx?: number;
  holdMs?: number;
};

const DEFAULT_MOVE_PX = 14;
const DEFAULT_HOLD_MS = 160;

export const useTapGuard = (onTap: TapHandler, onHoldStart?: HoldHandler, options?: Options) => {
  const movePx = options?.movePx ?? DEFAULT_MOVE_PX;
  const holdMs = options?.holdMs ?? DEFAULT_HOLD_MS;

  const stateRef = React.useRef({
    active: false,
    pointerId: null as number | null,
    startX: 0,
    startY: 0,
    moved: false,
    held: false,
    target: null as HTMLElement | null,
  });
  const holdTimerRef = React.useRef<number | null>(null);

  const reset = React.useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    stateRef.current.active = false;
    stateRef.current.pointerId = null;
    stateRef.current.moved = false;
    stateRef.current.held = false;
    stateRef.current.target = null;
  }, []);

  const onPointerDown = React.useCallback(
    (event: React.PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      stateRef.current.active = true;
      stateRef.current.pointerId = event.pointerId;
      stateRef.current.startX = event.clientX;
      stateRef.current.startY = event.clientY;
      stateRef.current.moved = false;
      stateRef.current.held = false;
      stateRef.current.target = event.currentTarget as HTMLElement;

      if (onHoldStart) {
        if (holdTimerRef.current) {
          clearTimeout(holdTimerRef.current);
        }
        holdTimerRef.current = window.setTimeout(() => {
          const state = stateRef.current;
          if (!state.active || state.moved || !state.target) return;
          const didShow = onHoldStart(state.target, state.startY);
          state.held = didShow === true;
        }, holdMs);
      }
    },
    [onHoldStart, holdMs]
  );

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent) => {
      const state = stateRef.current;
      if (!state.active || state.pointerId !== event.pointerId) return;
      const dx = Math.abs(event.clientX - state.startX);
      const dy = Math.abs(event.clientY - state.startY);
      if (dx > movePx || dy > movePx) {
        state.moved = true;
        if (holdTimerRef.current) {
          clearTimeout(holdTimerRef.current);
          holdTimerRef.current = null;
        }
        if (state.held) hidePreviewTooltip();
      }
    },
    [movePx]
  );

  const onPointerUp = React.useCallback(
    (event: React.PointerEvent) => {
      const state = stateRef.current;
      if (!state.active || state.pointerId !== event.pointerId) return;
      const shouldTap = !state.moved && !state.held;
      reset();
      if (shouldTap) onTap(event);
    },
    [onTap, reset]
  );

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: reset,
  };
};
