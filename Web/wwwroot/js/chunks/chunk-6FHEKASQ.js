import {
  normalizeCardTitleText,
  safeText
} from "./chunk-ZZ3K4DA3.js";
import {
  require_jsx_runtime
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTimelineCard.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpenseTimelineCard = ({
  dateParts,
  title,
  amountText,
  onOpen,
  titleClassName = "timeline-name",
  amountClassName = "expense-sheet-card__amount",
  statusClassName,
  statusLabel,
  subtitle = "",
  subtitleClassName = "expense-sheet-card__subtitle",
  statusIcon,
  statusIconClassName = "expense-sheet-card__status-icon"
}) => {
  const safeTitle = normalizeCardTitleText(title, "-");
  const safeAmount = amountText || "-";
  const safeSubtitle = safeText(subtitle);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: "timeline-card timeline-card--clickable",
      role: "button",
      tabIndex: 0,
      onClick: onOpen,
      onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "timeline-date-panel flex flex-col items-center justify-center gap-1 px-3 py-3 bg-slate-50 border-r border-slate-200 text-slate-600", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold tracking-[0.2em] text-slate-500", children: dateParts.year }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500", children: dateParts.month }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-2xl font-semibold text-primary", children: dateParts.day })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "timeline-card__content flex-1 py-3 px-4", children: [
          statusClassName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: statusClassName, title: statusLabel, "aria-label": statusLabel }) : null,
          statusIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: statusIconClassName, title: statusLabel, children: statusIcon }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: titleClassName, "data-fulltext": safeTitle, children: safeTitle }),
          safeSubtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: subtitleClassName, "data-fulltext": safeSubtitle, children: safeSubtitle }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: amountClassName, "data-fulltext": safeAmount, children: safeAmount })
        ] })
      ]
    }
  );
};
var ExpenseTimelineCard_default = ExpenseTimelineCard;

export {
  ExpenseTimelineCard_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VEYXRlUGFydHMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVRpbWVsaW5lQ2FyZFByb3BzID0ge1xuICBkYXRlUGFydHM6IEV4cGVuc2VEYXRlUGFydHM7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGFtb3VudFRleHQ6IHN0cmluZztcbiAgb25PcGVuOiAoKSA9PiB2b2lkO1xuICB0aXRsZUNsYXNzTmFtZT86IHN0cmluZztcbiAgYW1vdW50Q2xhc3NOYW1lPzogc3RyaW5nO1xuICBzdGF0dXNDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHN0YXR1c0xhYmVsPzogc3RyaW5nO1xuICBzdWJ0aXRsZT86IHN0cmluZztcbiAgc3VidGl0bGVDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHN0YXR1c0ljb24/OiBSZWFjdC5SZWFjdE5vZGU7XG4gIHN0YXR1c0ljb25DbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG4vLyBSZXVzYWJsZSBjbGlja2FibGUgdGltZWxpbmUgY2FyZCBmb3IgZXhwZW5zZSBzaGVldHMgYW5kIGV4cGVuc2UgbGluZXMuXG5jb25zdCBFeHBlbnNlVGltZWxpbmVDYXJkID0gKHtcbiAgZGF0ZVBhcnRzLFxuICB0aXRsZSxcbiAgYW1vdW50VGV4dCxcbiAgb25PcGVuLFxuICB0aXRsZUNsYXNzTmFtZSA9IFwidGltZWxpbmUtbmFtZVwiLFxuICBhbW91bnRDbGFzc05hbWUgPSBcImV4cGVuc2Utc2hlZXQtY2FyZF9fYW1vdW50XCIsXG4gIHN0YXR1c0NsYXNzTmFtZSxcbiAgc3RhdHVzTGFiZWwsXG4gIHN1YnRpdGxlID0gXCJcIixcbiAgc3VidGl0bGVDbGFzc05hbWUgPSBcImV4cGVuc2Utc2hlZXQtY2FyZF9fc3VidGl0bGVcIixcbiAgc3RhdHVzSWNvbixcbiAgc3RhdHVzSWNvbkNsYXNzTmFtZSA9IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMtaWNvblwiLFxufTogRXhwZW5zZVRpbWVsaW5lQ2FyZFByb3BzKSA9PiB7XG4gIGNvbnN0IHNhZmVUaXRsZSA9IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQodGl0bGUsIFwiLVwiKTtcbiAgY29uc3Qgc2FmZUFtb3VudCA9IGFtb3VudFRleHQgfHwgXCItXCI7XG4gIGNvbnN0IHNhZmVTdWJ0aXRsZSA9IHNhZmVUZXh0KHN1YnRpdGxlKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmQgdGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCJcbiAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICBvbkNsaWNrPXtvbk9wZW59XG4gICAgICBvbktleURvd249eyhldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIgfHwgZXZlbnQua2V5ID09PSBcIiBcIikge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgb25PcGVuKCk7XG4gICAgICAgIH1cbiAgICAgIH19XG4gICAgPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1kYXRlLXBhbmVsIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIHB4LTMgcHktMyBiZy1zbGF0ZS01MCBib3JkZXItciBib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57ZGF0ZVBhcnRzLnllYXJ9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2RhdGVQYXJ0cy5tb250aH08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntkYXRlUGFydHMuZGF5fTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmRfX2NvbnRlbnQgZmxleC0xIHB5LTMgcHgtNFwiPlxuICAgICAgICB7c3RhdHVzQ2xhc3NOYW1lID8gPHNwYW4gY2xhc3NOYW1lPXtzdGF0dXNDbGFzc05hbWV9IHRpdGxlPXtzdGF0dXNMYWJlbH0gYXJpYS1sYWJlbD17c3RhdHVzTGFiZWx9IC8+IDogbnVsbH1cbiAgICAgICAge3N0YXR1c0ljb24gPyA8c3BhbiBjbGFzc05hbWU9e3N0YXR1c0ljb25DbGFzc05hbWV9IHRpdGxlPXtzdGF0dXNMYWJlbH0+e3N0YXR1c0ljb259PC9zcGFuPiA6IG51bGx9XG4gICAgICAgIDxwIGNsYXNzTmFtZT17dGl0bGVDbGFzc05hbWV9IGRhdGEtZnVsbHRleHQ9e3NhZmVUaXRsZX0+XG4gICAgICAgICAge3NhZmVUaXRsZX1cbiAgICAgICAgPC9wPlxuICAgICAgICB7c2FmZVN1YnRpdGxlID8gKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT17c3VidGl0bGVDbGFzc05hbWV9IGRhdGEtZnVsbHRleHQ9e3NhZmVTdWJ0aXRsZX0+XG4gICAgICAgICAgICB7c2FmZVN1YnRpdGxlfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YW1vdW50Q2xhc3NOYW1lfSBkYXRhLWZ1bGx0ZXh0PXtzYWZlQW1vdW50fT5cbiAgICAgICAgICB7c2FmZUFtb3VudH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGltZWxpbmVDYXJkO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7O0FBbURNO0FBL0JOLElBQU0sc0JBQXNCLENBQUM7QUFBQSxFQUMzQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsaUJBQWlCO0FBQUEsRUFDakIsa0JBQWtCO0FBQUEsRUFDbEI7QUFBQSxFQUNBO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWCxvQkFBb0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0Esc0JBQXNCO0FBQ3hCLE1BQWdDO0FBQzlCLFFBQU0sWUFBWSx1QkFBdUIsT0FBTyxHQUFHO0FBQ25ELFFBQU0sYUFBYSxjQUFjO0FBQ2pDLFFBQU0sZUFBZSxTQUFTLFFBQVE7QUFFdEMsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsV0FBVTtBQUFBLE1BQ1YsTUFBSztBQUFBLE1BQ0wsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsV0FBVyxDQUFDLFVBQVU7QUFDcEIsWUFBSSxNQUFNLFFBQVEsV0FBVyxNQUFNLFFBQVEsS0FBSztBQUM5QyxnQkFBTSxlQUFlO0FBQ3JCLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxNQUVBO0FBQUEscURBQUMsU0FBSSxXQUFVLHNJQUNiO0FBQUEsc0RBQUMsU0FBSSxXQUFVLHlEQUF5RCxvQkFBVSxNQUFLO0FBQUEsVUFDdkYsNENBQUMsU0FBSSxXQUFVLG1FQUFtRSxvQkFBVSxPQUFNO0FBQUEsVUFDbEcsNENBQUMsU0FBSSxXQUFVLHVDQUF1QyxvQkFBVSxLQUFJO0FBQUEsV0FDdEU7QUFBQSxRQUNBLDZDQUFDLFNBQUksV0FBVSwyQ0FDWjtBQUFBLDRCQUFrQiw0Q0FBQyxVQUFLLFdBQVcsaUJBQWlCLE9BQU8sYUFBYSxjQUFZLGFBQWEsSUFBSztBQUFBLFVBQ3RHLGFBQWEsNENBQUMsVUFBSyxXQUFXLHFCQUFxQixPQUFPLGFBQWMsc0JBQVcsSUFBVTtBQUFBLFVBQzlGLDRDQUFDLE9BQUUsV0FBVyxnQkFBZ0IsaUJBQWUsV0FDMUMscUJBQ0g7QUFBQSxVQUNDLGVBQ0MsNENBQUMsT0FBRSxXQUFXLG1CQUFtQixpQkFBZSxjQUM3Qyx3QkFDSCxJQUNFO0FBQUEsVUFDSiw0Q0FBQyxVQUFLLFdBQVcsaUJBQWlCLGlCQUFlLFlBQzlDLHNCQUNIO0FBQUEsV0FDRjtBQUFBO0FBQUE7QUFBQSxFQUNGO0FBRUo7QUFFQSxJQUFPLDhCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=
