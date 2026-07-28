import React, { useCallback, useRef } from "react";
import { classNames } from "../../../utils/classNames.ts";
import { useTimelineCardEffects } from "../../../hooks/useTimelineCardEffects.ts";

export type TimelineDateParts = {
  year: string;
  month: string;
  day: string;
};

export type TimelineItem = {
  id: string;
  actividadId?: string;
  recId?: number | null;
  name: string;
  description: string;
  fullName: string;
  fullDesc: string;
  ownerText: string;
  hasDescription: boolean;
  dateParts: TimelineDateParts;
  isNoData: boolean;
};

type Props = {
  items: TimelineItem[];
  noDataText: string;
  errorMessage: string;
  onNavigate: (linkId: string) => void;
};

const TAP_MOVE_PX = 14;
const HOLD_TO_PREVIEW_MS = 160;

type TapGuardState = {
  active: boolean;
  pointerId: number | null;
  startX: number;
  startY: number;
  startTime: number;
  moved: boolean;
  linkId: string;
};

const HistoryTable = ({ items, noDataText, errorMessage, onNavigate }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tapGuardRef = useRef<TapGuardState>({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    startTime: 0,
    moved: false,
    linkId: "",
  });

  const resolveClickableCard = useCallback((target: EventTarget | null) => {
    const node = target as HTMLElement | null;
    if (!node || typeof node.closest !== "function") return null;
    const card = node.closest<HTMLElement>(".timeline-card--clickable[data-link-id]");
    if (!card) return null;
    if (!containerRef.current?.contains(card)) return null;
    return card;
  }, []);

  const resetTapGuard = useCallback(() => {
    tapGuardRef.current.active = false;
    tapGuardRef.current.pointerId = null;
    tapGuardRef.current.moved = false;
    tapGuardRef.current.linkId = "";
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      const card = resolveClickableCard(event.target);
      if (!card) return;
      const linkId = card.dataset.linkId || "";
      if (!linkId) return;

      tapGuardRef.current.active = true;
      tapGuardRef.current.pointerId = event.pointerId;
      tapGuardRef.current.startX = event.clientX;
      tapGuardRef.current.startY = event.clientY;
      tapGuardRef.current.startTime = Date.now();
      tapGuardRef.current.moved = false;
      tapGuardRef.current.linkId = linkId;
    },
    [resolveClickableCard]
  );

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const state = tapGuardRef.current;
    if (!state.active || event.pointerId !== state.pointerId) return;
    const dx = Math.abs(event.clientX - state.startX);
    const dy = Math.abs(event.clientY - state.startY);
    if (dx > TAP_MOVE_PX || dy > TAP_MOVE_PX) {
      state.moved = true;
    }
  }, []);

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const state = tapGuardRef.current;
      if (!state.active || event.pointerId !== state.pointerId) return;
      const linkId = state.linkId;
      const heldMs = Date.now() - state.startTime;
      const shouldTap = !state.moved && heldMs < HOLD_TO_PREVIEW_MS;
      resetTapGuard();
      if (shouldTap && linkId) {
        onNavigate(linkId);
      }
    },
    [onNavigate, resetTapGuard]
  );

  const blockClipboardAction = useCallback(
    (event: React.ClipboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
      if (!resolveClickableCard(event.target)) return;
      event.preventDefault();
    },
    [resolveClickableCard]
  );

  useTimelineCardEffects({ containerRef, errorMessage, items, resolveClickableCard });

  const hasItems = items.length > 0;
  const showEmpty = !errorMessage && !hasItems;

  const content = errorMessage ? (
    <div className="text-danger">{errorMessage}</div>
  ) : hasItems ? (
    items.map((item, index) => {
      const key = item.id || item.recId?.toString() || `timeline-${index}`;
      const isClickable = !item.isNoData && !!item.id;
      const showDescription = item.hasDescription || item.isNoData;
      const accessibleName = [item.fullName || item.name || noDataText, item.ownerText].filter(Boolean).join(", ");
      return (
        <div key={key} className="timeline-item">
          <div
            className={classNames(
              "timeline-card",
              item.isNoData ? "timeline-card--nodata" : "",
              isClickable ? "timeline-card--clickable" : ""
            )}
            data-actividadid={item.actividadId || ""}
            data-recid={item.recId != null ? String(item.recId) : ""}
            data-link-id={isClickable ? item.id : ""}
            role={isClickable ? "button" : undefined}
            tabIndex={isClickable ? 0 : undefined}
            aria-label={isClickable ? accessibleName : undefined}
            onKeyDown={isClickable
              ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onNavigate(item.id);
                }
              }
              : undefined}
          >
            <div className="timeline-date-panel flex flex-col items-center justify-center gap-1 px-3 py-3 bg-slate-50 border-r border-slate-200 text-slate-600">
              <div className="text-xs font-semibold tracking-[0.2em] text-slate-500">{item.dateParts.year}</div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.dateParts.month}</div>
              <div className="text-2xl font-semibold text-primary">{item.dateParts.day}</div>
            </div>
            <div className="timeline-card__content flex-1 py-3 px-4">
              <div className="timeline-name" data-fulltext={item.fullName || item.name}>{item.name}</div>
              {item.ownerText ? (
                <p
                  className="visit-card__owner m-0 text-left text-[11px] leading-[1.2] text-[#00296bb8] normal-case tracking-normal whitespace-normal break-words"
                  data-owner-text={item.ownerText}
                >
                  {item.ownerText}
                </p>
              ) : null}
              {showDescription ? (
                <p className="timeline-desc-text ellipsis" data-fulltext={item.fullDesc || item.description}>
                  {item.description || noDataText}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      );
    })
  ) : null;

  return (
    <div
      id="timelineContainer"
      ref={containerRef}
      className={classNames("timeline-box", showEmpty ? "timeline-empty" : "")}
      data-empty-text={noDataText}
      onPointerDownCapture={handlePointerDown}
      onPointerMoveCapture={handlePointerMove}
      onPointerUpCapture={handlePointerUp}
      onPointerCancelCapture={resetTapGuard}
      onPointerLeave={resetTapGuard}
      onContextMenuCapture={blockClipboardAction}
      onCopyCapture={blockClipboardAction}
      onCutCapture={blockClipboardAction}
      onPasteCapture={blockClipboardAction}
    >
      {content}
    </div>
  );
};

const MemoizedHistoryTable = React.memo(HistoryTable);
MemoizedHistoryTable.displayName = "HistoryTable";

export default MemoizedHistoryTable;
