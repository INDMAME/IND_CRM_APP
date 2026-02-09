import {
  AudioRecorderMinimal
} from "./chunks/chunk-SIPNQN4V.js";
import {
  require_client,
  require_jsx_runtime
} from "./chunks/chunk-RGGEM6AY.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/system/AudioRecorder.tsx
var import_client = __toESM(require_client());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var mountAudioRecorder = () => {
  const el = document.getElementById("ind-audio-recorder-root");
  if (!el) return;
  const element = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioRecorderMinimal, {});
  if (el.__indRoot) {
    el.__indRoot.render(element);
    return;
  }
  const root = (0, import_client.createRoot)(el);
  el.__indRoot = root;
  root.render(element);
};
var mount = () => {
  mountAudioRecorder();
};
if (typeof document !== "undefined") {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    mount();
  } else {
    document.addEventListener("DOMContentLoaded", mount);
  }
}
var AudioRecorder_default = AudioRecorderMinimal;
export {
  AudioRecorder_default as default,
  mountAudioRecorder
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3N5c3RlbS9BdWRpb1JlY29yZGVyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCI7XG5pbXBvcnQgQXVkaW9SZWNvcmRlck1pbmltYWwgZnJvbSBcIi4vQXVkaW9SZWNvcmRlck1pbmltYWwudHN4XCI7XG5cbnR5cGUgSW5kUm9vdEVsZW1lbnQgPSBIVE1MRWxlbWVudCAmIHsgX19pbmRSb290PzogaW1wb3J0KFwicmVhY3QtZG9tL2NsaWVudFwiKS5Sb290IH07XG5cbi8vIE1vdW50IHRoZSBhdWRpbyByZWNvcmRlciBpbnRvIHRoZSBSYXpvciB2aWV3IHJvb3QuXG5leHBvcnQgY29uc3QgbW91bnRBdWRpb1JlY29yZGVyID0gKCkgPT4ge1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kLWF1ZGlvLXJlY29yZGVyLXJvb3RcIikgYXMgSW5kUm9vdEVsZW1lbnQgfCBudWxsO1xuICBpZiAoIWVsKSByZXR1cm47XG5cbiAgY29uc3QgZWxlbWVudCA9IDxBdWRpb1JlY29yZGVyTWluaW1hbCAvPjtcblxuICBpZiAoZWwuX19pbmRSb290KSB7XG4gICAgZWwuX19pbmRSb290LnJlbmRlcihlbGVtZW50KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByb290ID0gY3JlYXRlUm9vdChlbCk7XG4gIGVsLl9faW5kUm9vdCA9IHJvb3Q7XG4gIHJvb3QucmVuZGVyKGVsZW1lbnQpO1xufTtcblxuLy8gQXV0by1tb3VudCB3aGVuIHRoZSBwYWdlIGJ1bmRsZSBsb2Fkcy5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBtb3VudEF1ZGlvUmVjb3JkZXIoKTtcbn07XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImludGVyYWN0aXZlXCIpIHtcbiAgICBtb3VudCgpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIG1vdW50KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdWRpb1JlY29yZGVyTWluaW1hbDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7OztBQUNBLG9CQUEyQjtBQVVUO0FBSlgsSUFBTSxxQkFBcUIsTUFBTTtBQUN0QyxRQUFNLEtBQUssU0FBUyxlQUFlLHlCQUF5QjtBQUM1RCxNQUFJLENBQUMsR0FBSTtBQUVULFFBQU0sVUFBVSw0Q0FBQyx3QkFBcUI7QUFFdEMsTUFBSSxHQUFHLFdBQVc7QUFDaEIsT0FBRyxVQUFVLE9BQU8sT0FBTztBQUMzQjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLFdBQU8sMEJBQVcsRUFBRTtBQUMxQixLQUFHLFlBQVk7QUFDZixPQUFLLE9BQU8sT0FBTztBQUNyQjtBQUdBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLHFCQUFtQjtBQUNyQjtBQUVBLElBQUksT0FBTyxhQUFhLGFBQWE7QUFDbkMsTUFBSSxTQUFTLGVBQWUsY0FBYyxTQUFTLGVBQWUsZUFBZTtBQUMvRSxVQUFNO0FBQUEsRUFDUixPQUFPO0FBQ0wsYUFBUyxpQkFBaUIsb0JBQW9CLEtBQUs7QUFBQSxFQUNyRDtBQUNGO0FBRUEsSUFBTyx3QkFBUTsiLAogICJuYW1lcyI6IFtdCn0K
