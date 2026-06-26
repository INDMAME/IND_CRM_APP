import {
  normalizeCardTitleText,
  safeText
} from "./chunk-GDLOXSCF.js";
import {
  require_jsx_runtime
} from "./chunk-2NKOKBT5.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

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
  subtitleContent,
  subtitleClassName = "expense-sheet-card__subtitle",
  statusIcon,
  statusIconClassName = "expense-sheet-card__status-icon",
  datePanelContent,
  interactionProps
}) => {
  const safeTitle = normalizeCardTitleText(title, "-");
  const safeAmount = amountText || "-";
  const safeSubtitle = safeText(subtitle);
  const {
    onClick: customOnClick,
    onKeyDown: customOnKeyDown,
    role: customRole,
    tabIndex: customTabIndex,
    ...restInteractionProps
  } = interactionProps || {};
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      type: "button",
      className: "timeline-card timeline-card--clickable expense-timeline-card text-left",
      role: customRole,
      tabIndex: typeof customTabIndex === "number" ? customTabIndex : 0,
      onClick: customOnClick ?? onOpen,
      onKeyDown: customOnKeyDown,
      ...restInteractionProps,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-date-panel expense-timeline-card__date-panel flex flex-col items-center justify-center gap-1 border-r border-[#e2e8f0] bg-[#f8fafc] text-[#00296be0]", children: datePanelContent ? datePanelContent : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold tracking-[0.2em] text-[#00296bb8]", children: dateParts.year }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-[#00296bb8]", children: dateParts.month }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-2xl font-semibold text-primary", children: dateParts.day })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "timeline-card__content expense-timeline-card__content flex-1", children: [
          statusClassName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: statusClassName, title: statusLabel, "aria-label": statusLabel }) : null,
          statusIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: statusIconClassName, role: "group", "aria-label": statusLabel || void 0, children: statusIcon }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: titleClassName, "data-fulltext": safeTitle, children: safeTitle }),
          subtitleContent || safeSubtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: subtitleClassName, "data-fulltext": safeSubtitle, children: subtitleContent || safeSubtitle }) : null,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZURhdGVQYXJ0cyB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBub3JtYWxpemVDYXJkVGl0bGVUZXh0LCBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlVGltZWxpbmVDYXJkSW50ZXJhY3Rpb25Qcm9wcyA9IFBpY2s8XHJcbiAgUmVhY3QuQnV0dG9uSFRNTEF0dHJpYnV0ZXM8SFRNTEJ1dHRvbkVsZW1lbnQ+LFxyXG4gIHwgXCJhcmlhLWxhYmVsXCJcclxuICB8IFwiYXJpYS1wcmVzc2VkXCJcclxuICB8IFwib25DbGlja1wiXHJcbiAgfCBcIm9uQ29udGV4dE1lbnVcIlxyXG4gIHwgXCJvbktleURvd25cIlxyXG4gIHwgXCJvblBvaW50ZXJDYW5jZWxcIlxyXG4gIHwgXCJvblBvaW50ZXJEb3duXCJcclxuICB8IFwib25Qb2ludGVyTW92ZVwiXHJcbiAgfCBcIm9uUG9pbnRlclVwXCJcclxuICB8IFwicm9sZVwiXHJcbiAgfCBcInRhYkluZGV4XCJcclxuPjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpbWVsaW5lQ2FyZFByb3BzID0ge1xyXG4gIGRhdGVQYXJ0czogRXhwZW5zZURhdGVQYXJ0cztcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGFtb3VudFRleHQ6IHN0cmluZztcclxuICBvbk9wZW46ICgpID0+IHZvaWQ7XHJcbiAgdGl0bGVDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgYW1vdW50Q2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHN0YXR1c0NsYXNzTmFtZT86IHN0cmluZztcclxuICBzdGF0dXNMYWJlbD86IHN0cmluZztcbiAgc3VidGl0bGU/OiBzdHJpbmc7XG4gIHN1YnRpdGxlQ29udGVudD86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgc3VidGl0bGVDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHN0YXR1c0ljb24/OiBSZWFjdC5SZWFjdE5vZGU7XG4gIHN0YXR1c0ljb25DbGFzc05hbWU/OiBzdHJpbmc7XG4gIGRhdGVQYW5lbENvbnRlbnQ/OiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgaW50ZXJhY3Rpb25Qcm9wcz86IEV4cGVuc2VUaW1lbGluZUNhcmRJbnRlcmFjdGlvblByb3BzO1xyXG59O1xyXG5cclxuLy8gUmV1c2FibGUgY2xpY2thYmxlIHRpbWVsaW5lIGNhcmQgZm9yIGV4cGVuc2Ugc2hlZXRzIGFuZCBleHBlbnNlIGxpbmVzLlxyXG5jb25zdCBFeHBlbnNlVGltZWxpbmVDYXJkID0gKHtcclxuICBkYXRlUGFydHMsXHJcbiAgdGl0bGUsXHJcbiAgYW1vdW50VGV4dCxcclxuICBvbk9wZW4sXHJcbiAgdGl0bGVDbGFzc05hbWUgPSBcInRpbWVsaW5lLW5hbWVcIixcclxuICBhbW91bnRDbGFzc05hbWUgPSBcImV4cGVuc2Utc2hlZXQtY2FyZF9fYW1vdW50XCIsXHJcbiAgc3RhdHVzQ2xhc3NOYW1lLFxuICBzdGF0dXNMYWJlbCxcbiAgc3VidGl0bGUgPSBcIlwiLFxuICBzdWJ0aXRsZUNvbnRlbnQsXG4gIHN1YnRpdGxlQ2xhc3NOYW1lID0gXCJleHBlbnNlLXNoZWV0LWNhcmRfX3N1YnRpdGxlXCIsXG4gIHN0YXR1c0ljb24sXG4gIHN0YXR1c0ljb25DbGFzc05hbWUgPSBcImV4cGVuc2Utc2hlZXQtY2FyZF9fc3RhdHVzLWljb25cIixcclxuICBkYXRlUGFuZWxDb250ZW50LFxyXG4gIGludGVyYWN0aW9uUHJvcHMsXHJcbn06IEV4cGVuc2VUaW1lbGluZUNhcmRQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHNhZmVUaXRsZSA9IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQodGl0bGUsIFwiLVwiKTtcclxuICBjb25zdCBzYWZlQW1vdW50ID0gYW1vdW50VGV4dCB8fCBcIi1cIjtcclxuICBjb25zdCBzYWZlU3VidGl0bGUgPSBzYWZlVGV4dChzdWJ0aXRsZSk7XHJcbiAgY29uc3Qge1xyXG4gICAgb25DbGljazogY3VzdG9tT25DbGljayxcclxuICAgIG9uS2V5RG93bjogY3VzdG9tT25LZXlEb3duLFxyXG4gICAgcm9sZTogY3VzdG9tUm9sZSxcclxuICAgIHRhYkluZGV4OiBjdXN0b21UYWJJbmRleCxcclxuICAgIC4uLnJlc3RJbnRlcmFjdGlvblByb3BzXHJcbiAgfSA9IGludGVyYWN0aW9uUHJvcHMgfHwge307XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uXHJcbiAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICBjbGFzc05hbWU9XCJ0aW1lbGluZS1jYXJkIHRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZSBleHBlbnNlLXRpbWVsaW5lLWNhcmQgdGV4dC1sZWZ0XCJcclxuICAgICAgcm9sZT17Y3VzdG9tUm9sZX1cclxuICAgICAgdGFiSW5kZXg9e3R5cGVvZiBjdXN0b21UYWJJbmRleCA9PT0gXCJudW1iZXJcIiA/IGN1c3RvbVRhYkluZGV4IDogMH1cclxuICAgICAgb25DbGljaz17Y3VzdG9tT25DbGljayA/PyBvbk9wZW59XHJcbiAgICAgIG9uS2V5RG93bj17Y3VzdG9tT25LZXlEb3dufVxyXG4gICAgICB7Li4ucmVzdEludGVyYWN0aW9uUHJvcHN9XHJcbiAgICA+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtZGF0ZS1wYW5lbCBleHBlbnNlLXRpbWVsaW5lLWNhcmRfX2RhdGUtcGFuZWwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgYm9yZGVyLXIgYm9yZGVyLVsjZTJlOGYwXSBiZy1bI2Y4ZmFmY10gdGV4dC1bIzAwMjk2YmUwXVwiPlxuICAgICAgICB7ZGF0ZVBhbmVsQ29udGVudCA/IChcbiAgICAgICAgICBkYXRlUGFuZWxDb250ZW50XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRyYWNraW5nLVswLjJlbV0gdGV4dC1bIzAwMjk2YmI4XVwiPntkYXRlUGFydHMueWVhcn08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yZW1dIHRleHQtWyMwMDI5NmJiOF1cIj57ZGF0ZVBhcnRzLm1vbnRofTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntkYXRlUGFydHMuZGF5fTwvZGl2PlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtY2FyZF9fY29udGVudCBleHBlbnNlLXRpbWVsaW5lLWNhcmRfX2NvbnRlbnQgZmxleC0xXCI+XHJcbiAgICAgICAge3N0YXR1c0NsYXNzTmFtZSA/IDxzcGFuIGNsYXNzTmFtZT17c3RhdHVzQ2xhc3NOYW1lfSB0aXRsZT17c3RhdHVzTGFiZWx9IGFyaWEtbGFiZWw9e3N0YXR1c0xhYmVsfSAvPiA6IG51bGx9XHJcbiAgICAgICAge3N0YXR1c0ljb24gPyAoXHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0YXR1c0ljb25DbGFzc05hbWV9IHJvbGU9XCJncm91cFwiIGFyaWEtbGFiZWw9e3N0YXR1c0xhYmVsIHx8IHVuZGVmaW5lZH0+XHJcbiAgICAgICAgICAgIHtzdGF0dXNJY29ufVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT17dGl0bGVDbGFzc05hbWV9IGRhdGEtZnVsbHRleHQ9e3NhZmVUaXRsZX0+XHJcbiAgICAgICAgICB7c2FmZVRpdGxlfVxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICB7c3VidGl0bGVDb250ZW50IHx8IHNhZmVTdWJ0aXRsZSA/IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9e3N1YnRpdGxlQ2xhc3NOYW1lfSBkYXRhLWZ1bGx0ZXh0PXtzYWZlU3VidGl0bGV9PlxuICAgICAgICAgICAge3N1YnRpdGxlQ29udGVudCB8fCBzYWZlU3VidGl0bGV9XG4gICAgICAgICAgPC9wPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXthbW91bnRDbGFzc05hbWV9IGRhdGEtZnVsbHRleHQ9e3NhZmVBbW91bnR9PlxyXG4gICAgICAgICAge3NhZmVBbW91bnR9XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvYnV0dG9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGltZWxpbmVDYXJkO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7QUFnRlU7QUExQ1YsSUFBTSxzQkFBc0IsQ0FBQztBQUFBLEVBQzNCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxpQkFBaUI7QUFBQSxFQUNqQixrQkFBa0I7QUFBQSxFQUNsQjtBQUFBLEVBQ0E7QUFBQSxFQUNBLFdBQVc7QUFBQSxFQUNYO0FBQUEsRUFDQSxvQkFBb0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0Esc0JBQXNCO0FBQUEsRUFDdEI7QUFBQSxFQUNBO0FBQ0YsTUFBZ0M7QUFDOUIsUUFBTSxZQUFZLHVCQUF1QixPQUFPLEdBQUc7QUFDbkQsUUFBTSxhQUFhLGNBQWM7QUFDakMsUUFBTSxlQUFlLFNBQVMsUUFBUTtBQUN0QyxRQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxXQUFXO0FBQUEsSUFDWCxNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsSUFDVixHQUFHO0FBQUEsRUFDTCxJQUFJLG9CQUFvQixDQUFDO0FBRXpCLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLE1BQUs7QUFBQSxNQUNMLFdBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLFVBQVUsT0FBTyxtQkFBbUIsV0FBVyxpQkFBaUI7QUFBQSxNQUNoRSxTQUFTLGlCQUFpQjtBQUFBLE1BQzFCLFdBQVc7QUFBQSxNQUNWLEdBQUc7QUFBQSxNQUVKO0FBQUEsb0RBQUMsU0FBSSxXQUFVLGlLQUNaLDZCQUNDLG1CQUVBLDRFQUNFO0FBQUEsc0RBQUMsU0FBSSxXQUFVLDJEQUEyRCxvQkFBVSxNQUFLO0FBQUEsVUFDekYsNENBQUMsU0FBSSxXQUFVLHFFQUFxRSxvQkFBVSxPQUFNO0FBQUEsVUFDcEcsNENBQUMsU0FBSSxXQUFVLHVDQUF1QyxvQkFBVSxLQUFJO0FBQUEsV0FDdEUsR0FFSjtBQUFBLFFBQ0EsNkNBQUMsU0FBSSxXQUFVLGdFQUNaO0FBQUEsNEJBQWtCLDRDQUFDLFVBQUssV0FBVyxpQkFBaUIsT0FBTyxhQUFhLGNBQVksYUFBYSxJQUFLO0FBQUEsVUFDdEcsYUFDQyw0Q0FBQyxVQUFLLFdBQVcscUJBQXFCLE1BQUssU0FBUSxjQUFZLGVBQWUsUUFDM0Usc0JBQ0gsSUFDRTtBQUFBLFVBQ0osNENBQUMsT0FBRSxXQUFXLGdCQUFnQixpQkFBZSxXQUMxQyxxQkFDSDtBQUFBLFVBQ0MsbUJBQW1CLGVBQ2xCLDRDQUFDLE9BQUUsV0FBVyxtQkFBbUIsaUJBQWUsY0FDN0MsNkJBQW1CLGNBQ3RCLElBQ0U7QUFBQSxVQUNKLDRDQUFDLFVBQUssV0FBVyxpQkFBaUIsaUJBQWUsWUFDOUMsc0JBQ0g7QUFBQSxXQUNGO0FBQUE7QUFBQTtBQUFBLEVBQ0Y7QUFFSjtBQUVBLElBQU8sOEJBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==
