import {
  indT
} from "./chunk-V2CDSLX2.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/components/commons/Spinner.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var Spinner = ({ size = "h-4 w-4", label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: `ind-spinner ${size}`, viewBox: "0 0 20 20", role: "status", "aria-label": label || indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) });
var Spinner_default = Spinner;

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
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var FloatingList = ({
  anchorRef,
  open,
  zIndex = 3e5,
  maxHeightClass = "max-h-72",
  roundedClass = "rounded-md",
  role,
  portalClassName,
  panelClassName,
  children
}) => {
  const style = useFloatingPosition(anchorRef, open);
  if (!open) return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "div",
      {
        style: {
          position: "fixed",
          top: style.top,
          left: style.left,
          width: style.width,
          zIndex
        },
        className: portalClassName,
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            role,
            className: `w-full overflow-auto ${roundedClass} bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden ${maxHeightClass} ${panelClassName || ""}`,
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
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var ChevronDownSvg = ({ className = "h-5 w-5" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m19.5 8.25-7.5 7.5-7.5-7.5" })
    }
  );
};
var ChevronUpSvg = ({ className = "h-5 w-5" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m4.5 15.75 7.5-7.5 7.5 7.5" })
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
  Spinner_default,
  FloatingList_default,
  ChevronDownSvg,
  ChevronUpSvg,
  useOutsideClick
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TcGlubmVyLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nTGlzdC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUZsb2F0aW5nUG9zaXRpb24udHMiLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9jaGV2cm9ucy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZU91dHNpZGVDbGljay50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIHNpemU/OiBzdHJpbmc7XG4gIGxhYmVsPzogc3RyaW5nO1xufTtcblxuY29uc3QgU3Bpbm5lciA9ICh7IHNpemUgPSBcImgtNCB3LTRcIiwgbGFiZWwgfTogUHJvcHMpID0+IChcbiAgPHN2ZyBjbGFzc05hbWU9e2BpbmQtc3Bpbm5lciAke3NpemV9YH0gdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtsYWJlbCB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgPC9zdmc+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBTcGlubmVyO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IHVzZUZsb2F0aW5nUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlRmxvYXRpbmdQb3NpdGlvbi50c1wiO1xuXG50eXBlIFByb3BzID0ge1xuICBhbmNob3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD47XG4gIG9wZW46IGJvb2xlYW47XG4gIHpJbmRleD86IG51bWJlcjtcbiAgbWF4SGVpZ2h0Q2xhc3M/OiBzdHJpbmc7XG4gIHJvdW5kZWRDbGFzcz86IHN0cmluZztcbiAgcm9sZT86IHN0cmluZztcbiAgcG9ydGFsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbmNvbnN0IEZsb2F0aW5nTGlzdCA9ICh7XG4gIGFuY2hvclJlZixcbiAgb3BlbixcbiAgekluZGV4ID0gMzAwMDAwLFxuICBtYXhIZWlnaHRDbGFzcyA9IFwibWF4LWgtNzJcIixcbiAgcm91bmRlZENsYXNzID0gXCJyb3VuZGVkLW1kXCIsXG4gIHJvbGUsXG4gIHBvcnRhbENsYXNzTmFtZSxcbiAgcGFuZWxDbGFzc05hbWUsXG4gIGNoaWxkcmVuLFxufTogUHJvcHMpID0+IHtcbiAgY29uc3Qgc3R5bGUgPSB1c2VGbG9hdGluZ1Bvc2l0aW9uKGFuY2hvclJlZiwgb3Blbik7XG4gIGlmICghb3BlbikgcmV0dXJuIG51bGw7XG4gIHJldHVybiBjcmVhdGVQb3J0YWwoXG4gICAgPGRpdlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgdG9wOiBzdHlsZS50b3AsXG4gICAgICAgIGxlZnQ6IHN0eWxlLmxlZnQsXG4gICAgICAgIHdpZHRoOiBzdHlsZS53aWR0aCxcbiAgICAgICAgekluZGV4LFxuICAgICAgfX1cbiAgICAgIGNsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgcm9sZT17cm9sZX1cbiAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIG92ZXJmbG93LWF1dG8gJHtyb3VuZGVkQ2xhc3N9IGJnLXdoaXRlIHB5LTEgdGV4dC1zbSBzaGFkb3ctbGcgcmluZy0xIHJpbmctYmxhY2svNSBmb2N1czpvdXRsaW5lLWhpZGRlbiAke21heEhlaWdodENsYXNzfSAke3BhbmVsQ2xhc3NOYW1lIHx8IFwiXCJ9YH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+LFxuICAgIGRvY3VtZW50LmJvZHlcbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZsb2F0aW5nTGlzdDtcbiIsICJpbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCB1c2VGbG9hdGluZ1Bvc2l0aW9uID0gKHRhcmdldFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50Piwgb3BlbjogYm9vbGVhbikgPT4ge1xuICBjb25zdCBbc3R5bGUsIHNldFN0eWxlXSA9IHVzZVN0YXRlKHsgdG9wOiAwLCBsZWZ0OiAwLCB3aWR0aDogMCB9KTtcblxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghb3BlbiB8fCAhdGFyZ2V0UmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCB1cGRhdGUgPSAoKSA9PiB7XG4gICAgICBjb25zdCByZWN0ID0gdGFyZ2V0UmVmLmN1cnJlbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKCFyZWN0KSByZXR1cm47XG4gICAgICBzZXRTdHlsZSh7XG4gICAgICAgIHRvcDogcmVjdC5ib3R0b20gKyA2LFxuICAgICAgICBsZWZ0OiByZWN0LmxlZnQsXG4gICAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgICAgfSk7XG4gICAgfTtcbiAgICB1cGRhdGUoKTtcbiAgICBjb25zdCBvblNjcm9sbCA9ICgpID0+IG9wZW4gJiYgdXBkYXRlKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgY2FwdHVyZTogdHJ1ZSwgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCwgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGUpO1xuICAgIH07XG4gIH0sIFtvcGVuLCB0YXJnZXRSZWZdKTtcblxuICByZXR1cm4gc3R5bGU7XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBDaGV2cm9uRG93blN2ZyA9ICh7IGNsYXNzTmFtZSA9IFwiaC01IHctNVwiIH0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHN2Z1xyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgc3Ryb2tlV2lkdGg9ezEuNX1cclxuICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XHJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICA+XHJcbiAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE5LjUgOC4yNS03LjUgNy41LTcuNS03LjVcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBDaGV2cm9uVXBTdmcgPSAoeyBjbGFzc05hbWUgPSBcImgtNSB3LTVcIiB9KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmdcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XHJcbiAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgPlxyXG4gICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm00LjUgMTUuNzUgNy41LTcuNSA3LjUgNy41XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4gICk7XHJcbn07XHJcblxyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGNvbnN0IHVzZU91dHNpZGVDbGljayA9IChcbiAgcmVmczogUmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50PiB8IEFycmF5PFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD4+LFxuICBvbkNsb3NlOiAoKSA9PiB2b2lkXG4pID0+IHtcbiAgY29uc3QgbGlzdCA9IHVzZU1lbW8oKCkgPT4gKEFycmF5LmlzQXJyYXkocmVmcykgPyByZWZzIDogW3JlZnNdKSwgW3JlZnNdKTtcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZihsaXN0KTtcbiAgY29uc3Qgb25DbG9zZVJlZiA9IHVzZVJlZihvbkNsb3NlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxpc3RSZWYuY3VycmVudCA9IGxpc3Q7XG4gIH0sIFtsaXN0XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBvbkNsb3NlUmVmLmN1cnJlbnQgPSBvbkNsb3NlO1xuICB9LCBbb25DbG9zZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlciA9IChldjogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRMaXN0ID0gbGlzdFJlZi5jdXJyZW50O1xuICAgICAgY29uc3QgaXNJbnNpZGUgPSBjdXJyZW50TGlzdC5zb21lKChyKSA9PiByPy5jdXJyZW50ICYmIHIuY3VycmVudC5jb250YWlucyhldi50YXJnZXQgYXMgTm9kZSkpO1xuICAgICAgaWYgKGlzSW5zaWRlKSByZXR1cm47XG4gICAgICBvbkNsb3NlUmVmLmN1cnJlbnQoKTtcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVyKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVyLCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVyKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZXIpO1xuICAgIH07XG4gIH0sIFtdKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7O0FBVUk7QUFGSixJQUFNLFVBQVUsQ0FBQyxFQUFFLE9BQU8sV0FBVyxNQUFNLE1BQ3pDLDRDQUFDLFNBQUksV0FBVyxlQUFlLElBQUksSUFBSSxTQUFRLGFBQVksTUFBSyxVQUFTLGNBQVksU0FBUyxLQUFLLGtCQUFrQixTQUFTLEdBQzVILHNEQUFDLFlBQU8sV0FBVSx1QkFBc0IsSUFBRyxNQUFLLElBQUcsTUFBSyxHQUFFLEtBQUksYUFBWSxLQUFJLEdBQ2hGO0FBR0YsSUFBTyxrQkFBUTs7O0FDYmYsdUJBQTZCOzs7QUNEN0IsbUJBQTBDO0FBRW5DLElBQU0sc0JBQXNCLENBQUMsV0FBeUMsU0FBa0I7QUFDN0YsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHVCQUFTLEVBQUUsS0FBSyxHQUFHLE1B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QUFBQSxFQUNwQixHQUFHLENBQUMsSUFBSSxDQUFDO0FBRVQsK0JBQVUsTUFBTTtBQUNkLGVBQVcsVUFBVTtBQUFBLEVBQ3ZCLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFFWiwrQkFBVSxNQUFNO0FBQ2QsVUFBTSxVQUFVLENBQUMsT0FBZ0M7QUFDL0MsWUFBTSxjQUFjLFFBQVE7QUFDNUIsWUFBTSxXQUFXLFlBQVksS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLEVBQUUsUUFBUSxTQUFTLEdBQUcsTUFBYyxDQUFDO0FBQzVGLFVBQUksU0FBVTtBQUNkLGlCQUFXLFFBQVE7QUFBQSxJQUNyQjtBQUVBLGFBQVMsaUJBQWlCLGFBQWEsT0FBTztBQUM5QyxhQUFTLGlCQUFpQixjQUFjLFNBQVMsRUFBRSxTQUFTLEtBQUssQ0FBQztBQUVsRSxXQUFPLE1BQU07QUFDWCxlQUFTLG9CQUFvQixhQUFhLE9BQU87QUFDakQsZUFBUyxvQkFBb0IsY0FBYyxPQUFPO0FBQUEsSUFDcEQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBQ1A7IiwKICAibmFtZXMiOiBbImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0Il0KfQo=
