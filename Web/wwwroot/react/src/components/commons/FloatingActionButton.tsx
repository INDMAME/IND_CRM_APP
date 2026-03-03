import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type FloatingActionButtonMenuItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  route?: string;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
};

type FloatingActionButtonProps = {
  route?: string;
  ariaLabel: string;
  size?: number;
  right?: number;
  bottom?: number;
  color?: string;
  shadowOpacity?: number;
  plusThickness?: number;
  plusLength?: number;
  onClick?: () => void;
  menuItems?: FloatingActionButtonMenuItem[];
  isMenuOpen?: boolean;
  onMenuOpenChange?: (isOpen: boolean) => void;
  closeMenuOnSelect?: boolean;
  menuAriaLabel?: string;
  menuClassName?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

// Floating action button that supports direct action or speed-dial menu mode.
const FloatingActionButton = ({
  route,
  ariaLabel,
  size = 76,
  right = 24,
  bottom = 24,
  color = "#00296b",
  shadowOpacity = 0.16,
  plusThickness = 4,
  plusLength = 28,
  onClick,
  menuItems = [],
  isMenuOpen,
  onMenuOpenChange,
  closeMenuOnSelect = true,
  menuAriaLabel,
  menuClassName = "",
}: FloatingActionButtonProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const hasMenu = menuItems.length > 0;
  const isMenuControlled = typeof isMenuOpen === "boolean";
  const menuOpen = hasMenu ? (isMenuControlled ? Boolean(isMenuOpen) : internalMenuOpen) : false;

  const setMenuOpen = useCallback(
    (nextOpen: boolean) => {
      if (!hasMenu) return;
      if (!isMenuControlled) {
        setInternalMenuOpen(nextOpen);
      }
      onMenuOpenChange?.(nextOpen);
    },
    [hasMenu, isMenuControlled, onMenuOpenChange]
  );

  const buildFabSvg = useCallback(() => {
    const safeOpacity = clamp(shadowOpacity, 0, 0.5);
    const safeThickness = clamp(plusThickness, 2, 8);
    const safeLength = clamp(plusLength, 16, 40);

    const cx = 48;
    const xV = cx - safeThickness / 2;
    const yV = cx - safeLength / 2;
    const xH = cx - safeLength / 2;
    const yH = cx - safeThickness / 2;

    return `
      <svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="fabShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="-4" dy="10" stdDeviation="6" flood-color="#000" flood-opacity="${safeOpacity}"/>
          </filter>
        </defs>

        <g filter="url(#fabShadow)">
          <circle cx="48" cy="48" r="34" fill="${color}"/>
        </g>

        <g fill="#fff">
          <rect x="${xV}" y="${yV}" width="${safeThickness}" height="${safeLength}" rx="1"/>
          <rect x="${xH}" y="${yH}" width="${safeLength}" height="${safeThickness}" rx="1"/>
        </g>
      </svg>
    `.trim();
  }, [color, plusLength, plusThickness, shadowOpacity]);

  const renderSvgToCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sizePx = Math.max(40, size);
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(sizePx * dpr);
    canvas.height = Math.round(sizePx * dpr);
    canvas.style.width = `${sizePx}px`;
    canvas.style.height = `${sizePx}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const svg = buildFabSvg();
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      ctx.clearRect(0, 0, sizePx, sizePx);
      ctx.drawImage(img, 0, 0, sizePx, sizePx);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, [buildFabSvg, size]);

  useEffect(() => {
    renderSvgToCanvas();
    window.addEventListener("resize", renderSvgToCanvas);
    return () => window.removeEventListener("resize", renderSvgToCanvas);
  }, [renderSvgToCanvas]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const node = event.target as Node | null;
      if (!node) return;
      if (rootRef.current?.contains(node)) return;
      setMenuOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick, { passive: true });
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen, setMenuOpen]);

  const runPrimaryAction = useCallback(() => {
    if (typeof onClick === "function") {
      onClick();
      return;
    }
    if (!route || typeof window === "undefined") return;
    window.location.href = route;
  }, [onClick, route]);

  const handleMainClick = useCallback(() => {
    if (hasMenu) {
      setMenuOpen(!menuOpen);
      return;
    }

    runPrimaryAction();
  }, [hasMenu, menuOpen, runPrimaryAction, setMenuOpen]);

  const handleMenuItemClick = useCallback(
    (item: FloatingActionButtonMenuItem) => {
      if (item.disabled) return;

      if (typeof item.onClick === "function") {
        item.onClick();
      } else if (item.route && typeof window !== "undefined") {
        window.location.href = item.route;
      }

      if (closeMenuOnSelect) {
        setMenuOpen(false);
      }
    },
    [closeMenuOnSelect, setMenuOpen]
  );

  const menuPanelClassName = useMemo(() => {
    const base = "min-w-[11rem] rounded-xl border border-slate-200 bg-white p-2 shadow-xl";
    const extra = menuClassName.trim();
    return extra ? `${base} ${extra}` : base;
  }, [menuClassName]);

  return (
    <div
      ref={rootRef}
      className="fixed z-2000 flex flex-col items-end gap-2"
      style={{
        right: `${right}px`,
        bottom: `${bottom}px`,
      }}
    >
      {menuOpen ? (
        <div role="menu" aria-label={menuAriaLabel || ariaLabel} className={menuPanelClassName}>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  role="menuitem"
                  aria-label={item.ariaLabel || item.label}
                  disabled={item.disabled}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[16px] font-medium leading-5 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => handleMenuItemClick(item)}
                >
                  {item.icon ? <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">{item.icon}</span> : null}
                  <span className="truncate">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={hasMenu ? menuOpen : undefined}
        aria-haspopup={hasMenu ? "menu" : undefined}
        className="rounded-md border-0 bg-transparent p-0 transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-4"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          WebkitTapHighlightColor: "transparent",
        }}
        onClick={handleMainClick}
      >
        <canvas ref={canvasRef} className="block rounded-md" />
      </button>
    </div>
  );
};

export default FloatingActionButton;
