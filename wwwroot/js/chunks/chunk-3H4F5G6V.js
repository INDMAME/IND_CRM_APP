import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/components/commons/FloatingActionButton.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var clamp = (value, min, max) => Math.min(max, Math.max(min, value));
var FloatingActionButton = ({
  route,
  ariaLabel,
  size = 76,
  right = 24,
  bottom = 24,
  color = "#00296b",
  shadowOpacity = 0.16,
  plusThickness = 4,
  plusLength = 28,
  onClick
}) => {
  const btnRef = (0, import_react.useRef)(null);
  const canvasRef = (0, import_react.useRef)(null);
  const buildFabSvg = (0, import_react.useCallback)(() => {
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
  }, [color, shadowOpacity, plusLength, plusThickness]);
  const renderSvgToCanvas = (0, import_react.useCallback)(() => {
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
  (0, import_react.useEffect)(() => {
    renderSvgToCanvas();
    window.addEventListener("resize", renderSvgToCanvas);
    return () => window.removeEventListener("resize", renderSvgToCanvas);
  }, [renderSvgToCanvas]);
  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick();
      return;
    }
    if (!route || typeof window === "undefined") return;
    window.location.href = route;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      ref: btnRef,
      type: "button",
      "aria-label": ariaLabel,
      className: "fixed z-2000 rounded-md p-0 border-0 bg-transparent transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-4",
      style: {
        width: `${size}px`,
        height: `${size}px`,
        right: `${right}px`,
        bottom: `${bottom}px`,
        WebkitTapHighlightColor: "transparent"
      },
      onClick: handleClick,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", { ref: canvasRef, className: "block rounded-md" })
    }
  );
};
var FloatingActionButton_default = FloatingActionButton;

export {
  FloatingActionButton_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvblByb3BzID0ge1xuICByb3V0ZTogc3RyaW5nO1xuICBhcmlhTGFiZWw6IHN0cmluZztcbiAgc2l6ZT86IG51bWJlcjtcbiAgcmlnaHQ/OiBudW1iZXI7XG4gIGJvdHRvbT86IG51bWJlcjtcbiAgY29sb3I/OiBzdHJpbmc7XG4gIHNoYWRvd09wYWNpdHk/OiBudW1iZXI7XG4gIHBsdXNUaGlja25lc3M/OiBudW1iZXI7XG4gIHBsdXNMZW5ndGg/OiBudW1iZXI7XG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xufTtcblxuY29uc3QgY2xhbXAgPSAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KG1pbiwgdmFsdWUpKTtcblxuLy8gRmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiB0aGF0IHJlbmRlcnMgYSBjcmlzcCBTVkcgb250byBhIGNhbnZhcy5cbmNvbnN0IEZsb2F0aW5nQWN0aW9uQnV0dG9uID0gKHtcbiAgcm91dGUsXG4gIGFyaWFMYWJlbCxcbiAgc2l6ZSA9IDc2LFxuICByaWdodCA9IDI0LFxuICBib3R0b20gPSAyNCxcbiAgY29sb3IgPSBcIiMwMDI5NmJcIixcbiAgc2hhZG93T3BhY2l0eSA9IDAuMTYsXG4gIHBsdXNUaGlja25lc3MgPSA0LFxuICBwbHVzTGVuZ3RoID0gMjgsXG4gIG9uQ2xpY2ssXG59OiBGbG9hdGluZ0FjdGlvbkJ1dHRvblByb3BzKSA9PiB7XG4gIGNvbnN0IGJ0blJlZiA9IHVzZVJlZjxIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjYW52YXNSZWYgPSB1c2VSZWY8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBidWlsZEZhYlN2ZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBzYWZlT3BhY2l0eSA9IGNsYW1wKHNoYWRvd09wYWNpdHksIDAsIDAuNSk7XG4gICAgY29uc3Qgc2FmZVRoaWNrbmVzcyA9IGNsYW1wKHBsdXNUaGlja25lc3MsIDIsIDgpO1xuICAgIGNvbnN0IHNhZmVMZW5ndGggPSBjbGFtcChwbHVzTGVuZ3RoLCAxNiwgNDApO1xuXG4gICAgY29uc3QgY3ggPSA0ODtcbiAgICBjb25zdCB4ViA9IGN4IC0gc2FmZVRoaWNrbmVzcyAvIDI7XG4gICAgY29uc3QgeVYgPSBjeCAtIHNhZmVMZW5ndGggLyAyO1xuICAgIGNvbnN0IHhIID0gY3ggLSBzYWZlTGVuZ3RoIC8gMjtcbiAgICBjb25zdCB5SCA9IGN4IC0gc2FmZVRoaWNrbmVzcyAvIDI7XG5cbiAgICByZXR1cm4gYFxuICAgICAgPHN2ZyB3aWR0aD1cIjk2XCIgaGVpZ2h0PVwiOTZcIiB2aWV3Qm94PVwiMCAwIDk2IDk2XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICA8ZGVmcz5cbiAgICAgICAgICA8ZmlsdGVyIGlkPVwiZmFiU2hhZG93XCIgeD1cIi00MCVcIiB5PVwiLTQwJVwiIHdpZHRoPVwiMTgwJVwiIGhlaWdodD1cIjE4MCVcIj5cbiAgICAgICAgICAgIDxmZURyb3BTaGFkb3cgZHg9XCItNFwiIGR5PVwiMTBcIiBzdGREZXZpYXRpb249XCI2XCIgZmxvb2QtY29sb3I9XCIjMDAwXCIgZmxvb2Qtb3BhY2l0eT1cIiR7c2FmZU9wYWNpdHl9XCIvPlxuICAgICAgICAgIDwvZmlsdGVyPlxuICAgICAgICA8L2RlZnM+XG5cbiAgICAgICAgPGcgZmlsdGVyPVwidXJsKCNmYWJTaGFkb3cpXCI+XG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjQ4XCIgY3k9XCI0OFwiIHI9XCIzNFwiIGZpbGw9XCIke2NvbG9yfVwiLz5cbiAgICAgICAgPC9nPlxuXG4gICAgICAgIDxnIGZpbGw9XCIjZmZmXCI+XG4gICAgICAgICAgPHJlY3QgeD1cIiR7eFZ9XCIgeT1cIiR7eVZ9XCIgd2lkdGg9XCIke3NhZmVUaGlja25lc3N9XCIgaGVpZ2h0PVwiJHtzYWZlTGVuZ3RofVwiIHJ4PVwiMVwiLz5cbiAgICAgICAgICA8cmVjdCB4PVwiJHt4SH1cIiB5PVwiJHt5SH1cIiB3aWR0aD1cIiR7c2FmZUxlbmd0aH1cIiBoZWlnaHQ9XCIke3NhZmVUaGlja25lc3N9XCIgcng9XCIxXCIvPlxuICAgICAgICA8L2c+XG4gICAgICA8L3N2Zz5cbiAgICBgLnRyaW0oKTtcbiAgfSwgW2NvbG9yLCBzaGFkb3dPcGFjaXR5LCBwbHVzTGVuZ3RoLCBwbHVzVGhpY2tuZXNzXSk7XG5cbiAgY29uc3QgcmVuZGVyU3ZnVG9DYW52YXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGlmICghY3R4KSByZXR1cm47XG5cbiAgICBjb25zdCBzaXplUHggPSBNYXRoLm1heCg0MCwgc2l6ZSk7XG4gICAgY29uc3QgZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcblxuICAgIGNhbnZhcy53aWR0aCA9IE1hdGgucm91bmQoc2l6ZVB4ICogZHByKTtcbiAgICBjYW52YXMuaGVpZ2h0ID0gTWF0aC5yb3VuZChzaXplUHggKiBkcHIpO1xuICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3NpemVQeH1weGA7XG4gICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke3NpemVQeH1weGA7XG4gICAgY3R4LnNldFRyYW5zZm9ybShkcHIsIDAsIDAsIGRwciwgMCwgMCk7XG5cbiAgICBjb25zdCBzdmcgPSBidWlsZEZhYlN2ZygpO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbc3ZnXSwgeyB0eXBlOiBcImltYWdlL3N2Zyt4bWxcIiB9KTtcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLmRlY29kaW5nID0gXCJhc3luY1wiO1xuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHNpemVQeCwgc2l6ZVB4KTtcbiAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBzaXplUHgsIHNpemVQeCk7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgfTtcbiAgICBpbWcub25lcnJvciA9ICgpID0+IHtcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICB9O1xuICAgIGltZy5zcmMgPSB1cmw7XG4gIH0sIFtidWlsZEZhYlN2Zywgc2l6ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmVuZGVyU3ZnVG9DYW52YXMoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZW5kZXJTdmdUb0NhbnZhcyk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlbmRlclN2Z1RvQ2FudmFzKTtcbiAgfSwgW3JlbmRlclN2Z1RvQ2FudmFzXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBvbkNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIG9uQ2xpY2soKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFyb3V0ZSB8fCB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByb3V0ZTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxidXR0b25cbiAgICAgIHJlZj17YnRuUmVmfVxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICBjbGFzc05hbWU9XCJmaXhlZCB6LTIwMDAgcm91bmRlZC1tZCBwLTAgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMTUwIGhvdmVyOi10cmFuc2xhdGUteS0wLjUgYWN0aXZlOnNjYWxlLTk1IGZvY3VzLXZpc2libGU6cmluZy00IGZvY3VzLXZpc2libGU6cmluZy1wcmltYXJ5LzMwIGZvY3VzLXZpc2libGU6cmluZy1vZmZzZXQtNFwiXG4gICAgICBzdHlsZT17e1xuICAgICAgICB3aWR0aDogYCR7c2l6ZX1weGAsXG4gICAgICAgIGhlaWdodDogYCR7c2l6ZX1weGAsXG4gICAgICAgIHJpZ2h0OiBgJHtyaWdodH1weGAsXG4gICAgICAgIGJvdHRvbTogYCR7Ym90dG9tfXB4YCxcbiAgICAgICAgV2Via2l0VGFwSGlnaGxpZ2h0Q29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgIH19XG4gICAgICBvbkNsaWNrPXtoYW5kbGVDbGlja31cbiAgICA+XG4gICAgICA8Y2FudmFzIHJlZj17Y2FudmFzUmVmfSBjbGFzc05hbWU9XCJibG9jayByb3VuZGVkLW1kXCIgLz5cbiAgICA8L2J1dHRvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZsb2F0aW5nQWN0aW9uQnV0dG9uO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7O0FBQUEsbUJBQXNEO0FBOEhoRDtBQS9HTixJQUFNLFFBQVEsQ0FBQyxPQUFlLEtBQWEsUUFBZ0IsS0FBSyxJQUFJLEtBQUssS0FBSyxJQUFJLEtBQUssS0FBSyxDQUFDO0FBRzdGLElBQU0sdUJBQXVCLENBQUM7QUFBQSxFQUM1QjtBQUFBLEVBQ0E7QUFBQSxFQUNBLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxF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
