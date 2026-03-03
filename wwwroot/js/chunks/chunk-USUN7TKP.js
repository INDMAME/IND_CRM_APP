import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-KJNAPDCZ.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/components/commons/FloatingList.tsx
var import_react_dom = __toESM(require_react_dom());

// Web/wwwroot/react/src/hooks/useFloatingPosition.ts
var import_react = __toESM(require_react());
var useFloatingPosition = (targetRef, open) => {
  const [style, setStyle] = (0, import_react.useState)({ top: 0, left: 0, width: 0 });
  (0, import_react.useLayoutEffect)(() => {
    if (!open || !targetRef.current) return;
    const update = () => {
      const rect = targetRef.current?.getBoundingClientRect();
      if (!rect) return;
      setStyle({
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width
      });
    };
    update();
    const onScroll = () => open && update();
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", update);
    };
  }, [open, targetRef]);
  return style;
};

// Web/wwwroot/react/src/components/commons/FloatingList.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var FloatingList = ({
  anchorRef,
  open,
  zIndex = 3e5,
  fixedWidthPx,
  maxHeightClass = "max-h-72",
  roundedClass = "rounded-md",
  role,
  portalClassName,
  panelClassName,
  panelStyle,
  children
}) => {
  const style = useFloatingPosition(anchorRef, open);
  if (!open) return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "fixed",
          top: style.top,
          left: style.left,
          width: typeof fixedWidthPx === "number" && Number.isFinite(fixedWidthPx) ? fixedWidthPx : style.width,
          zIndex
        },
        className: portalClassName,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            role,
            className: `w-full overflow-auto ${roundedClass} bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden ${maxHeightClass} ${panelClassName || ""}`,
            style: panelStyle,
            children
          }
        )
      }
    ),
    document.body
  );
};
var FloatingList_default = FloatingList;

// Web/wwwroot/react/src/components/commons/chevrons.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ChevronDownSvg = ({ className = "h-5 w-5" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m19.5 8.25-7.5 7.5-7.5-7.5" })
    }
  );
};
var ChevronUpSvg = ({ className = "h-5 w-5" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m4.5 15.75 7.5-7.5 7.5 7.5" })
    }
  );
};

// Web/wwwroot/react/src/hooks/useOutsideClick.ts
var import_react2 = __toESM(require_react());
var useOutsideClick = (refs, onClose) => {
  const list = (0, import_react2.useMemo)(() => Array.isArray(refs) ? refs : [refs], [refs]);
  const listRef = (0, import_react2.useRef)(list);
  const onCloseRef = (0, import_react2.useRef)(onClose);
  (0, import_react2.useEffect)(() => {
    listRef.current = list;
  }, [list]);
  (0, import_react2.useEffect)(() => {
    onCloseRef.current = onClose;
  }, [onClose]);
  (0, import_react2.useEffect)(() => {
    const handler = (ev) => {
      const currentList = listRef.current;
      const isInside = currentList.some((r) => r?.current && r.current.contains(ev.target));
      if (isInside) return;
      onCloseRef.current();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);
};

export {
  FloatingList_default,
  ChevronDownSvg,
  ChevronUpSvg,
  useOutsideClick
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0xpc3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VGbG9hdGluZ1Bvc2l0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvY2hldnJvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IHVzZUZsb2F0aW5nUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlRmxvYXRpbmdQb3NpdGlvbi50c1wiO1xuXG50eXBlIFByb3BzID0ge1xuICBhbmNob3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD47XG4gIG9wZW46IGJvb2xlYW47XG4gIHpJbmRleD86IG51bWJlcjtcbiAgZml4ZWRXaWR0aFB4PzogbnVtYmVyO1xuICBtYXhIZWlnaHRDbGFzcz86IHN0cmluZztcbiAgcm91bmRlZENsYXNzPzogc3RyaW5nO1xuICByb2xlPzogc3RyaW5nO1xuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbFN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbmNvbnN0IEZsb2F0aW5nTGlzdCA9ICh7XG4gIGFuY2hvclJlZixcbiAgb3BlbixcbiAgekluZGV4ID0gMzAwMDAwLFxuICBmaXhlZFdpZHRoUHgsXG4gIG1heEhlaWdodENsYXNzID0gXCJtYXgtaC03MlwiLFxuICByb3VuZGVkQ2xhc3MgPSBcInJvdW5kZWQtbWRcIixcbiAgcm9sZSxcbiAgcG9ydGFsQ2xhc3NOYW1lLFxuICBwYW5lbENsYXNzTmFtZSxcbiAgcGFuZWxTdHlsZSxcbiAgY2hpbGRyZW4sXG59OiBQcm9wcykgPT4ge1xuICBjb25zdCBzdHlsZSA9IHVzZUZsb2F0aW5nUG9zaXRpb24oYW5jaG9yUmVmLCBvcGVuKTtcbiAgaWYgKCFvcGVuKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIGNyZWF0ZVBvcnRhbChcbiAgICA8ZGl2XG4gICAgICBzdHlsZT17e1xuICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgICAgICB0b3A6IHN0eWxlLnRvcCxcbiAgICAgICAgbGVmdDogc3R5bGUubGVmdCxcbiAgICAgICAgd2lkdGg6IHR5cGVvZiBmaXhlZFdpZHRoUHggPT09IFwibnVtYmVyXCIgJiYgTnVtYmVyLmlzRmluaXRlKGZpeGVkV2lkdGhQeCkgPyBmaXhlZFdpZHRoUHggOiBzdHlsZS53aWR0aCxcbiAgICAgICAgekluZGV4LFxuICAgICAgfX1cbiAgICAgIGNsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgcm9sZT17cm9sZX1cbiAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIG92ZXJmbG93LWF1dG8gJHtyb3VuZGVkQ2xhc3N9IGJnLXdoaXRlIHB5LTEgdGV4dC1zbSBzaGFkb3ctbGcgcmluZy0xIHJpbmctYmxhY2svNSBmb2N1czpvdXRsaW5lLWhpZGRlbiAke21heEhlaWdodENsYXNzfSAke3BhbmVsQ2xhc3NOYW1lIHx8IFwiXCJ9YH1cbiAgICAgICAgc3R5bGU9e3BhbmVsU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PixcbiAgICBkb2N1bWVudC5ib2R5XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGbG9hdGluZ0xpc3Q7XG4iLCAiaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgY29uc3QgdXNlRmxvYXRpbmdQb3NpdGlvbiA9ICh0YXJnZXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD4sIG9wZW46IGJvb2xlYW4pID0+IHtcbiAgY29uc3QgW3N0eWxlLCBzZXRTdHlsZV0gPSB1c2VTdGF0ZSh7IHRvcDogMCwgbGVmdDogMCwgd2lkdGg6IDAgfSk7XG5cbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW9wZW4gfHwgIXRhcmdldFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgY29uc3QgcmVjdCA9IHRhcmdldFJlZi5jdXJyZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmICghcmVjdCkgcmV0dXJuO1xuICAgICAgc2V0U3R5bGUoe1xuICAgICAgICB0b3A6IHJlY3QuYm90dG9tICsgNixcbiAgICAgICAgbGVmdDogcmVjdC5sZWZ0LFxuICAgICAgICB3aWR0aDogcmVjdC53aWR0aCxcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdXBkYXRlKCk7XG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiBvcGVuICYmIHVwZGF0ZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB7IGNhcHR1cmU6IHRydWUsIHBhc3NpdmU6IHRydWUgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlKTtcbiAgICB9O1xuICB9LCBbb3BlbiwgdGFyZ2V0UmVmXSk7XG5cbiAgcmV0dXJuIHN0eWxlO1xufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgY29uc3QgQ2hldnJvbkRvd25TdmcgPSAoeyBjbGFzc05hbWUgPSBcImgtNSB3LTVcIiB9KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmdcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XHJcbiAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgPlxyXG4gICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xOS41IDguMjUtNy41IDcuNS03LjUtNy41XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgQ2hldnJvblVwU3ZnID0gKHsgY2xhc3NOYW1lID0gXCJoLTUgdy01XCIgfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c3ZnXHJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgICBzdHJva2VXaWR0aD17MS41fVxyXG4gICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgID5cclxuICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtNC41IDE1Ljc1IDcuNS03LjUgNy41IDcuNVwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICApO1xyXG59O1xyXG5cclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCB1c2VPdXRzaWRlQ2xpY2sgPSAoXG4gIHJlZnM6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD4gfCBBcnJheTxSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+PixcbiAgb25DbG9zZTogKCkgPT4gdm9pZFxuKSA9PiB7XG4gIGNvbnN0IGxpc3QgPSB1c2VNZW1vKCgpID0+IChBcnJheS5pc0FycmF5KHJlZnMpID8gcmVmcyA6IFtyZWZzXSksIFtyZWZzXSk7XG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWYobGlzdCk7XG4gIGNvbnN0IG9uQ2xvc2VSZWYgPSB1c2VSZWYob25DbG9zZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsaXN0UmVmLmN1cnJlbnQgPSBsaXN0O1xuICB9LCBbbGlzdF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgb25DbG9zZVJlZi5jdXJyZW50ID0gb25DbG9zZTtcbiAgfSwgW29uQ2xvc2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZXIgPSAoZXY6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50TGlzdCA9IGxpc3RSZWYuY3VycmVudDtcbiAgICAgIGNvbnN0IGlzSW5zaWRlID0gY3VycmVudExpc3Quc29tZSgocikgPT4gcj8uY3VycmVudCAmJiByLmN1cnJlbnQuY29udGFpbnMoZXYudGFyZ2V0IGFzIE5vZGUpKTtcbiAgICAgIGlmIChpc0luc2lkZSkgcmV0dXJuO1xuICAgICAgb25DbG9zZVJlZi5jdXJyZW50KCk7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlcik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlciwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlcik7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVyKTtcbiAgICB9O1xuICB9LCBbXSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUNBLHVCQUE2Qjs7O0FDRDdCLG1CQUEwQztBQUVuQyxJQUFNLHNCQUFzQixDQUFDLFdBQXlDLFNBQWtCO0FBQzdGLFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx1QkFBUyxFQUFFLEtBQUssR0FBRyxNQUFNLEdBQUcsT0FBTyxFQUFFLENBQUM7QUFFaEUsb0NBQWdCLE1BQU07QUFDcEIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLFFBQVM7QUFDakMsVUFBTSxTQUFTLE1BQU07QUFDbkIsWUFBTSxPQUFPLFVBQVUsU0FBUyxzQkFBc0I7QUFDdEQsVUFBSSxDQUFDLEtBQU07QUFDWCxlQUFTO0FBQUEsUUFDUCxLQUFLLEtBQUssU0FBUztBQUFBLFFBQ25CLE1BQU0sS0FBSztBQUFBLFFBQ1gsT0FBTyxLQUFLO0FBQUEsTUFDZCxDQUFDO0FBQUEsSUFDSDtBQUNBLFdBQU87QUFDUCxVQUFNLFdBQVcsTUFBTSxRQUFRLE9BQU87QUFDdEMsV0FBTyxpQkFBaUIsVUFBVSxVQUFVLEVBQUUsU0FBUyxNQUFNLFNBQVMsS0FBSyxDQUFDO0FBQzVFLFdBQU8saUJBQWlCLFVBQVUsTUFBTTtBQUN4QyxXQUFPLE1BQU07QUFDWCxhQUFPLG9CQUFvQixVQUFVLFVBQVUsSUFBSTtBQUNuRCxhQUFPLG9CQUFvQixVQUFVLE1BQU07QUFBQSxJQUM3QztBQUFBLEVBQ0YsR0FBRyxDQUFDLE1BQU0sU0FBUyxDQUFDO0FBRXBCLFNBQU87QUFDVDs7O0FEaUJNO0FBMUJOLElBQU0sZUFBZSxDQUFDO0FBQUEs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
