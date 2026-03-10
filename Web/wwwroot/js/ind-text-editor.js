import {
  AudioRecorderMinimal
} from "./chunks/chunk-LVUQ5WFG.js";
import {
  TEXT_EDITOR_PREFIX
} from "./chunks/chunk-QO7GVWVB.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-BWM3JLWG.js";
import {
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionValueWithExpiry
} from "./chunks/chunk-7SKLSV7K.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/system/TextEditor.tsx
var import_react = __toESM(require_react());

// node_modules/@heroicons/react/24/outline/esm/ChevronLeftIcon.js
var React = __toESM(require_react(), 1);
function ChevronLeftIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 19.5 8.25 12l7.5-7.5"
  }));
}
var ForwardRef = /* @__PURE__ */ React.forwardRef(ChevronLeftIcon);
var ChevronLeftIcon_default = ForwardRef;

// node_modules/@heroicons/react/24/outline/esm/LockClosedIcon.js
var React2 = __toESM(require_react(), 1);
function LockClosedIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React2.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React2.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React2.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
  }));
}
var ForwardRef2 = /* @__PURE__ */ React2.forwardRef(LockClosedIcon);
var LockClosedIcon_default = ForwardRef2;

// Web/wwwroot/react/src/components/commons/PulseRingsMultipleIcon.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var PulseRingsMultipleIcon = ({
  size,
  color = "currentColor",
  strokeWidth = 2,
  background = "transparent",
  opacity = 0.4,
  rotation = 90,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 12,
  className
}) => {
  const transforms = [];
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
  if (flipHorizontal) transforms.push("scaleX(-1)");
  if (flipVertical) transforms.push("scaleY(-1)");
  const viewBoxSize = 24 + padding * 2;
  const viewBoxOffset = -padding;
  const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;
  const ringPath = "M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox,
      width: size,
      height: size,
      fill: "none",
      stroke: color,
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      style: {
        opacity,
        transform: transforms.join(" ") || void 0,
        filter: shadow > 0 ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))` : void 0,
        backgroundColor: background !== "transparent" ? background : void 0,
        color
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "ind-pulse-ring--base", fill: "currentColor", d: ringPath }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "ind-pulse-ring", fill: "currentColor", d: ringPath }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "ind-pulse-ring ind-pulse-ring--delay-1", fill: "currentColor", d: ringPath }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "ind-pulse-ring ind-pulse-ring--delay-2", fill: "currentColor", d: ringPath })
      ]
    }
  );
};
var PulseRingsMultipleIcon_default = PulseRingsMultipleIcon;

// Web/wwwroot/react/src/pages/system/TextEditor.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var IND_I18N = globalThis.__IND_I18N__ || {};
var indT = (key, fallback) => IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key] || fallback || key;
var STORAGE_PREFIX = TEXT_EDITOR_PREFIX;
var TOPBAR_HEIGHT = 64;
var OUTER_MARGIN = 5;
var MIN_EDITOR_HEIGHT = 240;
var RECORDER_GAP = 12;
var TYPE_INTERVAL_MS = 28;
var TYPE_TARGET_MS = 4200;
var TYPE_MIN_STEP = 1;
var TYPE_MAX_STEP = 4;
var TEXT_EDITOR_STORAGE_TTL_MS = 12 * 60 * 60 * 1e3;
var Spinner = ({ size = "h-6 w-6", label = "" }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  "svg",
  {
    className: `ind-spinner ${size}`,
    viewBox: "0 0 20 20",
    role: "status",
    "aria-label": label || indT("Common_Loading", "Loading"),
    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" })
  }
);
var getCsrfToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute("content") : "";
};
function safeGetSessionValue(key) {
  return getSessionValueWithExpiry(key);
}
function safeSetSessionValue(key, value) {
  setSessionValueWithExpiry(key, value, TEXT_EDITOR_STORAGE_TTL_MS);
}
function safeRemoveSessionValue(key) {
  removeSessionValueWithExpiry(key);
}
function parseBool(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
}
function parseOptionalBool(value, fallback) {
  const normalized = String(value || "").trim();
  if (!normalized) return fallback;
  return parseBool(normalized);
}
function getQueryParam(key) {
  if (typeof window === "undefined") return "";
  try {
    return new URLSearchParams(window.location.search || "").get(key) || "";
  } catch {
    return "";
  }
}
function normalizeEditModeKey(value) {
  const key = String(value || "").trim();
  if (!key) return "";
  return key.startsWith("ind_visit_edit_") ? key : "";
}
function IndTextEditorApp({ fieldId, fieldLabel, initialValue, returnUrl, initialReadOnly = false, editModeKey = "", allowEdit = true }) {
  const storageKey = (0, import_react.useMemo)(() => `${STORAGE_PREFIX}${String(fieldId || "").trim()}`, [fieldId]);
  const resolvedReturnUrl = (0, import_react.useMemo)(() => {
    const direct = typeof returnUrl === "string" ? returnUrl.trim() : "";
    if (direct) return direct;
    const safeId = String(fieldId || "").trim();
    if (!safeId) return "";
    try {
      const stored = getSessionValueWithExpiry(`${STORAGE_PREFIX}${safeId}_returnUrl`);
      return stored ? String(stored).trim() : "";
    } catch {
      return "";
    }
  }, [fieldId, returnUrl]);
  const canEdit = !!allowEdit;
  const [isReadOnly, setIsReadOnly] = (0, import_react.useState)(!!initialReadOnly || !canEdit);
  const normalizedEditModeKey = (0, import_react.useMemo)(() => normalizeEditModeKey(editModeKey), [editModeKey]);
  const [recorderOpen, setRecorderOpen] = (0, import_react.useState)(false);
  const [recorderResetKey, setRecorderResetKey] = (0, import_react.useState)(0);
  const [recorderHeightPx, setRecorderHeightPx] = (0, import_react.useState)(0);
  const [isTranscribing, setIsTranscribing] = (0, import_react.useState)(false);
  const [transcribeError, setTranscribeError] = (0, import_react.useState)("");
  const [isTyping, setIsTyping] = (0, import_react.useState)(false);
  const recorderBoxRef = (0, import_react.useRef)(null);
  const typingTimerRef = (0, import_react.useRef)(null);
  const typingTextRef = (0, import_react.useRef)("");
  const typingIndexRef = (0, import_react.useRef)(0);
  const initialTextRef = (0, import_react.useRef)("");
  const textareaRef = (0, import_react.useRef)(null);
  const computeEditorHeight = (0, import_react.useCallback)(() => {
    if (typeof window === "undefined") {
      const fallback = `calc(100vh - ${TOPBAR_HEIGHT + OUTER_MARGIN * 2}px)`;
      return fallback;
    }
    const viewport = window.innerHeight || 0;
    if (!viewport) {
      return `calc(100vh - ${TOPBAR_HEIGHT + OUTER_MARGIN * 2}px)`;
    }
    const recorderSpace = recorderOpen ? recorderHeightPx + RECORDER_GAP : 0;
    const available = Math.max(viewport - TOPBAR_HEIGHT - OUTER_MARGIN * 2 - recorderSpace, MIN_EDITOR_HEIGHT);
    return `${available}px`;
  }, [recorderOpen, recorderHeightPx]);
  const [editorHeight, setEditorHeight] = (0, import_react.useState)(() => computeEditorHeight());
  const [text, setText] = (0, import_react.useState)(() => {
    const stored = safeGetSessionValue(storageKey);
    const initialText = stored !== null ? stored : String(initialValue || "");
    initialTextRef.current = initialText;
    return initialText;
  });
  const hasActiveProcess = (0, import_react.useMemo)(
    () => !isReadOnly && (isTranscribing || isTyping || text !== (initialTextRef.current ?? "")),
    [isReadOnly, isTranscribing, isTyping, text]
  );
  const stopTyping = (0, import_react.useCallback)(() => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    typingTextRef.current = "";
    typingIndexRef.current = 0;
    setIsTyping(false);
  }, []);
  const startTyping = (0, import_react.useCallback)(
    (fullText) => {
      const textValue = String(fullText || "");
      stopTyping();
      if (!textValue) {
        setText("");
        return;
      }
      typingTextRef.current = textValue;
      typingIndexRef.current = 0;
      setIsTyping(true);
      setText("");
      const total = textValue.length;
      const maxSteps = Math.max(1, Math.floor(TYPE_TARGET_MS / TYPE_INTERVAL_MS));
      const stepSize = Math.min(TYPE_MAX_STEP, Math.max(TYPE_MIN_STEP, Math.ceil(total / maxSteps)));
      const tick = () => {
        const next = Math.min(typingIndexRef.current + stepSize, total);
        typingIndexRef.current = next;
        setText(typingTextRef.current.slice(0, next));
        if (next < total) {
          typingTimerRef.current = setTimeout(tick, TYPE_INTERVAL_MS);
        } else {
          typingTimerRef.current = null;
          setIsTyping(false);
        }
      };
      typingTimerRef.current = setTimeout(tick, TYPE_INTERVAL_MS);
    },
    [stopTyping]
  );
  const handleTranscribe = (0, import_react.useCallback)(
    async (wavBlob) => {
      if (!wavBlob || isTranscribing) return;
      setIsTranscribing(true);
      setTranscribeError("");
      try {
        const form = new FormData();
        form.append("languageId", "auto");
        form.append("audioFile", wavBlob, "audio.wav");
        if (resolvedReturnUrl) {
          form.append("returnUrl", resolvedReturnUrl);
        }
        const csrfToken = getCsrfToken();
        const headers = {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          ...csrfToken ? { RequestVerificationToken: csrfToken } : {}
        };
        const query = resolvedReturnUrl ? `?returnUrl=${encodeURIComponent(resolvedReturnUrl)}` : "";
        const response = await fetch(`/Visitas/TranscribeSpeech${query}`, {
          method: "POST",
          body: form,
          headers
        });
        const payload = await response.json().catch(() => null);
        const ok = response.ok && payload && payload.success === true;
        if (!ok) {
          const msg = payload && payload.message ? String(payload.message) : indT("TextEditor_TranscribeFailed", "Transcribe failed.");
          setTranscribeError(msg);
          return;
        }
        const transcript = payload && typeof payload.data === "string" ? payload.data : "";
        if (!transcript.trim()) {
          setTranscribeError(indT("TextEditor_TranscribeFailed", "Transcribe failed."));
          return;
        }
        startTyping(transcript);
        setRecorderOpen(false);
        setRecorderResetKey((k) => k + 1);
      } catch (err) {
        const msg = err && err.message ? String(err.message) : indT("TextEditor_TranscribeFailed", "Transcribe failed.");
        setTranscribeError(msg);
      } finally {
        setIsTranscribing(false);
      }
    },
    [isTranscribing, startTyping]
  );
  const handleAudioCleared = (0, import_react.useCallback)(() => {
    setTranscribeError("");
  }, []);
  const handleRecordingError = (0, import_react.useCallback)((message) => {
    try {
      if (window.IND && typeof window.IND.flashActionMark === "function") {
        window.IND.flashActionMark({ type: "warningProcess", durationMs: 1500 });
      }
    } catch {
    }
  }, []);
  (0, import_react.useEffect)(() => {
    if (typeof window === "undefined") return void 0;
    const updateHeight = () => {
      setEditorHeight(computeEditorHeight());
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    window.addEventListener("orientationchange", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("orientationchange", updateHeight);
    };
  }, [computeEditorHeight]);
  (0, import_react.useEffect)(() => {
    if (typeof window === "undefined") return void 0;
    if (!recorderOpen) {
      setRecorderHeightPx(0);
      return void 0;
    }
    const el = recorderBoxRef.current;
    if (!el) return void 0;
    const measure = () => {
      try {
        const rect = el.getBoundingClientRect();
        setRecorderHeightPx(Math.max(0, Math.floor(rect.height)));
      } catch {
      }
    };
    measure();
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [recorderOpen]);
  (0, import_react.useEffect)(() => stopTyping, [stopTyping]);
  (0, import_react.useEffect)(() => {
    window.__indSetNavigationGuard?.(hasActiveProcess);
    return () => {
      window.__indClearNavigationGuard?.();
    };
  }, [hasActiveProcess]);
  (0, import_react.useEffect)(() => {
    if (!isTyping) return;
    const el = textareaRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [isTyping, text]);
  const toggleRecorder = () => {
    if (isReadOnly || isTranscribing || isTyping) return;
    setTranscribeError("");
    setRecorderOpen((open) => {
      if (open) setRecorderResetKey((k) => k + 1);
      return !open;
    });
  };
  const allowHistoryNav = () => {
    if (typeof window === "undefined") return false;
    if (typeof window.__indAllowHistoryOnce === "function") {
      window.__indAllowHistoryOnce();
      return true;
    }
    return false;
  };
  const enableEdit = (0, import_react.useCallback)(() => {
    if (!canEdit || !isReadOnly) return;
    setIsReadOnly(false);
    if (normalizedEditModeKey) safeSetSessionValue(normalizedEditModeKey, "true");
  }, [canEdit, isReadOnly, normalizedEditModeKey]);
  const persistDraft = () => {
    safeSetSessionValue(storageKey, text);
  };
  const goBack = () => {
    persistDraft();
    if (resolvedReturnUrl) {
      window.location.href = resolvedReturnUrl;
      return;
    }
    if (window.history.length > 1 && allowHistoryNav()) return;
    window.history.back();
  };
  const goBackAfterSave = () => {
    if (resolvedReturnUrl) {
      window.location.href = resolvedReturnUrl;
      return;
    }
    if (window.history.length > 1 && allowHistoryNav()) return;
    window.history.back();
  };
  const onSave = () => {
    if (isReadOnly || isTranscribing || isTyping) return;
    safeSetSessionValue(storageKey, text);
    if (normalizedEditModeKey) {
      safeSetSessionValue(normalizedEditModeKey, "true");
      safeSetSessionValue(`${normalizedEditModeKey}_return`, "1");
    }
    window.__indBypassNavigationGuardOnce?.();
    goBackAfterSave();
  };
  const onCancelEdit = (0, import_react.useCallback)(() => {
    if (isReadOnly || isTranscribing || isTyping) return;
    stopTyping();
    setTranscribeError("");
    const initialText = initialTextRef.current ?? "";
    setText(initialText);
    safeSetSessionValue(storageKey, initialText);
    if (normalizedEditModeKey) {
      safeRemoveSessionValue(`${normalizedEditModeKey}_return`);
      safeRemoveSessionValue(normalizedEditModeKey);
    }
    window.__indBypassNavigationGuardOnce?.();
    goBackAfterSave();
  }, [isReadOnly, isTranscribing, isTyping, stopTyping, storageKey, goBackAfterSave, normalizedEditModeKey]);
  const editorBoxClass = isReadOnly ? "relative rounded-2xl border border-slate-200 bg-slate-100 shadow-lg overflow-hidden focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary" : "relative rounded-2xl border border-slate-300 bg-white shadow-lg overflow-hidden focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary";
  const micDisabled = isReadOnly || isTranscribing || isTyping;
  const micReadOnlyHint = indT("TextEditor_Microphone_ReadOnlyHint", "Audio transcription is available only in edit mode.");
  const micBaseLabel = indT("TextEditor_Microphone", "Microphone");
  const micAriaLabel = isReadOnly ? `${micBaseLabel}. ${micReadOnlyHint}` : micBaseLabel;
  const micTooltip = isReadOnly ? micReadOnlyHint : micBaseLabel;
  const micButtonClass = `absolute top-0 right-0 z-20 inline-flex h-[70px] w-[70px] items-center justify-center overflow-visible bg-transparent p-0 m-0 border-0 rounded-none text-primary shadow-none focus:outline-hidden focus:ring-0 focus:ring-offset-0${micDisabled ? isReadOnly ? " opacity-70 cursor-not-allowed text-slate-400" : " opacity-70 cursor-not-allowed text-primary/60" : " hover:text-primary/80"}`;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "min-h-screen h-dvh w-full flex flex-col bg-slate-200", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "topbar shadow-md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          className: "topbar-btn",
          "aria-label": indT("Topbar_Back", "Back"),
          onClick: goBack,
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChevronLeftIcon_default, { className: "h-6 w-6", "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "topbar-center flex-1 flex justify-center pointer-events-none px-2", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { id: "topbarTitle", className: "truncate", children: fieldLabel }) }),
      isReadOnly ? canEdit ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          className: "topbar-btn",
          "aria-label": indT("Common_Edit", "Edit"),
          onClick: enableEdit,
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" }) })
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { "aria-hidden": "true", style: { width: "25px", height: "25px" } }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center gap-[14px] pr-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            type: "button",
            className: "topbar-btn",
            "aria-label": indT("Common_Save", "Save"),
            onClick: onSave,
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "h-6 w-6", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m4.5 12.75 6 6 9-13.5" }) })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            type: "button",
            className: "topbar-btn",
            "aria-label": indT("Common_Cancel", "Cancel"),
            onClick: onCancelEdit,
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "h-6 w-6", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18 18 6M6 6l12 12" }) })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex-1 min-h-0 w-full px-4 pb-4 pt-3", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "w-full max-w-3xl mx-auto", style: { marginTop: `${OUTER_MARGIN}px`, marginBottom: `${OUTER_MARGIN}px` }, children: [
      recorderOpen && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref: recorderBoxRef, className: "mb-3 w-full", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        AudioRecorderMinimal,
        {
          embedded: true,
          onTranscribe: handleTranscribe,
          transcribeBusy: isTranscribing,
          transcribeLabel: indT("TextEditor_Transcribe", "Transcribe"),
          transcribeBusyLabel: indT("TextEditor_Transcribing", "Transcribing"),
          onAudioCleared: handleAudioCleared,
          onRecordingError: handleRecordingError
        },
        recorderResetKey
      ) }),
      transcribeError ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mb-3 text-xs text-rose-700 text-center", children: transcribeError }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: editorBoxClass, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "textarea",
          {
            ref: textareaRef,
            className: `w-full resize-none bg-transparent px-5 pb-5 pt-10 pr-14 focus:outline-hidden ${isReadOnly ? "ind-readonly-field" : "text-slate-900"}`,
            value: text,
            onChange: (e) => setText(e.target.value),
            disabled: isTranscribing || isTyping,
            readOnly: isReadOnly || isTranscribing || isTyping,
            "aria-readonly": isReadOnly ? "true" : void 0,
            "aria-busy": isTranscribing || isTyping,
            style: { height: editorHeight }
          }
        ),
        isTranscribing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "absolute inset-0 z-20 flex items-center justify-center bg-slate-200/80", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Spinner, { size: "h-16 w-16" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "sr-only", children: indT("TextEditor_Transcribing", "Transcribing") })
        ] }) }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            type: "button",
            className: micButtonClass,
            "aria-label": micAriaLabel,
            title: micTooltip,
            onClick: toggleRecorder,
            disabled: micDisabled,
            "aria-disabled": micDisabled ? "true" : void 0,
            children: isReadOnly ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LockClosedIcon_default, { className: "h-6 w-6 relative z-10", "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PulseRingsMultipleIcon_default, { size: 240, padding: 12, color: "currentColor", strokeWidth: 2, opacity: 0.3, rotation: 90 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1, stroke: "currentColor", className: "h-6 w-6 relative z-10", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" }) })
            ] })
          }
        )
      ] })
    ] }) })
  ] });
}
var mountTextEditor = () => {
  const rootEl = document.getElementById("ind-text-editor-root");
  if (!rootEl) return;
  const fieldId = rootEl.getAttribute("data-field-id") || "";
  const fieldLabel = rootEl.getAttribute("data-field-label") || "";
  const initialValue = rootEl.getAttribute("data-field-value") || "";
  const returnUrl = rootEl.getAttribute("data-return-url") || "";
  const readOnlyAttr = rootEl.getAttribute("data-read-only") || "";
  const initialReadOnly = parseBool(readOnlyAttr) || parseBool(getQueryParam("readOnly")) || parseBool(getQueryParam("readonly"));
  const allowEditAttr = rootEl.getAttribute("data-allow-edit") || "";
  const allowEditQuery = getQueryParam("allowEdit") || getQueryParam("canEdit");
  const allowEdit = parseOptionalBool(allowEditQuery, parseOptionalBool(allowEditAttr, true));
  const editModeKeyAttr = rootEl.getAttribute("data-edit-mode-key") || "";
  const editModeKey = editModeKeyAttr || getQueryParam("editModeKey") || "";
  mountReactIsland(
    rootEl,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      IndTextEditorApp,
      {
        fieldId,
        fieldLabel,
        initialValue,
        returnUrl,
        initialReadOnly,
        editModeKey,
        allowEdit
      }
    )
  );
};
var mount = () => {
  mountTextEditor();
};
mountWhenDocumentReady(mount);
var TextEditor_default = IndTextEditorApp;
export {
  TextEditor_default as default,
  mountTextEditor
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3N5c3RlbS9UZXh0RWRpdG9yLnRzeCIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGhlcm9pY29ucy9yZWFjdC8yNC9vdXRsaW5lL2VzbS9DaGV2cm9uTGVmdEljb24uanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BoZXJvaWNvbnMvcmVhY3QvMjQvb3V0bGluZS9lc20vTG9ja0Nsb3NlZEljb24uanMiLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9QdWxzZVJpbmdzTXVsdGlwbGVJY29uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENoZXZyb25MZWZ0SWNvbiwgTG9ja0Nsb3NlZEljb24gfSBmcm9tIFwiQGhlcm9pY29ucy9yZWFjdC8yNC9vdXRsaW5lXCI7XG5pbXBvcnQgQXVkaW9SZWNvcmRlck1pbmltYWwgZnJvbSBcIi4vQXVkaW9SZWNvcmRlck1pbmltYWwudHN4XCI7XG5pbXBvcnQgUHVsc2VSaW5nc011bHRpcGxlSWNvbiBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1B1bHNlUmluZ3NNdWx0aXBsZUljb24udHN4XCI7XG5pbXBvcnQgeyBURVhUX0VESVRPUl9QUkVGSVggfSBmcm9tIFwiLi4vLi4vdXRpbHMvdGV4dEVkaXRvci50c1wiO1xuaW1wb3J0IHsgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSB9IGZyb20gXCIuLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuXHJcbmNvbnN0IElORF9JMThOID0gZ2xvYmFsVGhpcy5fX0lORF9JMThOX18gfHwge307XHJcbmNvbnN0IGluZFQgPSAoa2V5LCBmYWxsYmFjaykgPT4gKElORF9JMThOICYmIHR5cGVvZiBJTkRfSTE4TltrZXldID09PSBcInN0cmluZ1wiICYmIElORF9JMThOW2tleV0pIHx8IGZhbGxiYWNrIHx8IGtleTtcclxuXHJcbmNvbnN0IFNUT1JBR0VfUFJFRklYID0gVEVYVF9FRElUT1JfUFJFRklYO1xuY29uc3QgVE9QQkFSX0hFSUdIVCA9IDY0O1xuY29uc3QgT1VURVJfTUFSR0lOID0gNTtcbmNvbnN0IE1JTl9FRElUT1JfSEVJR0hUID0gMjQwO1xuY29uc3QgUkVDT1JERVJfR0FQID0gMTI7XG5jb25zdCBUWVBFX0lOVEVSVkFMX01TID0gMjg7XG5jb25zdCBUWVBFX1RBUkdFVF9NUyA9IDQyMDA7XG5jb25zdCBUWVBFX01JTl9TVEVQID0gMTtcbmNvbnN0IFRZUEVfTUFYX1NURVAgPSA0O1xuY29uc3QgVEVYVF9FRElUT1JfU1RPUkFHRV9UVExfTVMgPSAxMiAqIDYwICogNjAgKiAxMDAwO1xuXG4vLyBTaGFyZWQgc3Bpbm5lciBmb3IgbG9jYWwgbG9hZGluZyBzdGF0ZXMuXHJcbnR5cGUgU3Bpbm5lclByb3BzID0ge1xuICBzaXplPzogc3RyaW5nO1xuICBsYWJlbD86IHN0cmluZztcbn07XG5cbmNvbnN0IFNwaW5uZXIgPSAoeyBzaXplID0gXCJoLTYgdy02XCIsIGxhYmVsID0gXCJcIiB9OiBTcGlubmVyUHJvcHMpID0+IChcbiAgPHN2Z1xyXG4gICAgY2xhc3NOYW1lPXtgaW5kLXNwaW5uZXIgJHtzaXplfWB9XHJcbiAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcclxuICAgIHJvbGU9XCJzdGF0dXNcIlxyXG4gICAgYXJpYS1sYWJlbD17bGFiZWwgfHwgaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICA+XHJcbiAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cclxuICA8L3N2Zz5cclxuKTtcblxuY29uc3QgZ2V0Q3NyZlRva2VuID0gKCkgPT4ge1xuICBjb25zdCBtZXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpO1xuICByZXR1cm4gbWV0YSA/IG1ldGEuZ2V0QXR0cmlidXRlKFwiY29udGVudFwiKSA6IFwiXCI7XG59O1xuXHJcbmZ1bmN0aW9uIHNhZmVHZXRTZXNzaW9uVmFsdWUoa2V5KSB7XG4gIHJldHVybiBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XG59XG5cbmZ1bmN0aW9uIHNhZmVTZXRTZXNzaW9uVmFsdWUoa2V5LCB2YWx1ZSkge1xuICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSwgdmFsdWUsIFRFWFRfRURJVE9SX1NUT1JBR0VfVFRMX01TKTtcbn1cblxuLy8gUmVtb3ZlIGEgc2Vzc2lvbiB2YWx1ZSB3aXRob3V0IHRocm93aW5nIGZvciBibG9ja2VkIHN0b3JhZ2UuXG5mdW5jdGlvbiBzYWZlUmVtb3ZlU2Vzc2lvblZhbHVlKGtleSkge1xuICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XG59XG5cclxuZnVuY3Rpb24gcGFyc2VCb29sKHZhbHVlKSB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICByZXR1cm4gbm9ybWFsaXplZCA9PT0gXCIxXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJ0cnVlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJ5ZXNcIjtcclxufVxyXG5cclxuLy8gUGFyc2VzIG9wdGlvbmFsIGJvb2xlYW4gdmFsdWVzIHdpdGggYSBkZWZhdWx0IGZhbGxiYWNrLlxyXG5mdW5jdGlvbiBwYXJzZU9wdGlvbmFsQm9vbCh2YWx1ZSwgZmFsbGJhY2spIHtcclxuICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBmYWxsYmFjaztcclxuICByZXR1cm4gcGFyc2VCb29sKG5vcm1hbGl6ZWQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRRdWVyeVBhcmFtKGtleSkge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gXCJcIjtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCB8fCBcIlwiKS5nZXQoa2V5KSB8fCBcIlwiO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBub3JtYWxpemVFZGl0TW9kZUtleSh2YWx1ZSkge1xyXG4gIGNvbnN0IGtleSA9IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCFrZXkpIHJldHVybiBcIlwiO1xyXG4gIHJldHVybiBrZXkuc3RhcnRzV2l0aChcImluZF92aXNpdF9lZGl0X1wiKSA/IGtleSA6IFwiXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEluZFRleHRFZGl0b3JBcHAoeyBmaWVsZElkLCBmaWVsZExhYmVsLCBpbml0aWFsVmFsdWUsIHJldHVyblVybCwgaW5pdGlhbFJlYWRPbmx5ID0gZmFsc2UsIGVkaXRNb2RlS2V5ID0gXCJcIiwgYWxsb3dFZGl0ID0gdHJ1ZSB9KSB7XG4gIGNvbnN0IHN0b3JhZ2VLZXkgPSB1c2VNZW1vKCgpID0+IGAke1NUT1JBR0VfUFJFRklYfSR7U3RyaW5nKGZpZWxkSWQgfHwgXCJcIikudHJpbSgpfWAsIFtmaWVsZElkXSk7XG4gIC8vIFJlc29sdmUgcmV0dXJuIFVSTCBmcm9tIHByb3BzIG9yIHNlc3Npb25TdG9yYWdlLlxyXG4gIGNvbnN0IHJlc29sdmVkUmV0dXJuVXJsID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBkaXJlY3QgPSB0eXBlb2YgcmV0dXJuVXJsID09PSBcInN0cmluZ1wiID8gcmV0dXJuVXJsLnRyaW0oKSA6IFwiXCI7XHJcbiAgICBpZiAoZGlyZWN0KSByZXR1cm4gZGlyZWN0O1xyXG4gICAgY29uc3Qgc2FmZUlkID0gU3RyaW5nKGZpZWxkSWQgfHwgXCJcIikudHJpbSgpO1xuICAgIGlmICghc2FmZUlkKSByZXR1cm4gXCJcIjtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3RvcmVkID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShgJHtTVE9SQUdFX1BSRUZJWH0ke3NhZmVJZH1fcmV0dXJuVXJsYCk7XG4gICAgICByZXR1cm4gc3RvcmVkID8gU3RyaW5nKHN0b3JlZCkudHJpbSgpIDogXCJcIjtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cclxuICB9LCBbZmllbGRJZCwgcmV0dXJuVXJsXSk7XHJcbiAgY29uc3QgY2FuRWRpdCA9ICEhYWxsb3dFZGl0O1xyXG4gIGNvbnN0IFtpc1JlYWRPbmx5LCBzZXRJc1JlYWRPbmx5XSA9IHVzZVN0YXRlKCEhaW5pdGlhbFJlYWRPbmx5IHx8ICFjYW5FZGl0KTtcbiAgY29uc3Qgbm9ybWFsaXplZEVkaXRNb2RlS2V5ID0gdXNlTWVtbygoKSA9PiBub3JtYWxpemVFZGl0TW9kZUtleShlZGl0TW9kZUtleSksIFtlZGl0TW9kZUtleV0pO1xuICBjb25zdCBbcmVjb3JkZXJPcGVuLCBzZXRSZWNvcmRlck9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtyZWNvcmRlclJlc2V0S2V5LCBzZXRSZWNvcmRlclJlc2V0S2V5XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtyZWNvcmRlckhlaWdodFB4LCBzZXRSZWNvcmRlckhlaWdodFB4XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtpc1RyYW5zY3JpYmluZywgc2V0SXNUcmFuc2NyaWJpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFt0cmFuc2NyaWJlRXJyb3IsIHNldFRyYW5zY3JpYmVFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbaXNUeXBpbmcsIHNldElzVHlwaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCByZWNvcmRlckJveFJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCB0eXBpbmdUaW1lclJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgdHlwaW5nVGV4dFJlZiA9IHVzZVJlZihcIlwiKTtcbiAgY29uc3QgdHlwaW5nSW5kZXhSZWYgPSB1c2VSZWYoMCk7XG4gIGNvbnN0IGluaXRpYWxUZXh0UmVmID0gdXNlUmVmKFwiXCIpO1xuICBjb25zdCB0ZXh0YXJlYVJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgY29tcHV0ZUVkaXRvckhlaWdodCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgIGNvbnN0IGZhbGxiYWNrID0gYGNhbGMoMTAwdmggLSAke1RPUEJBUl9IRUlHSFQgKyBPVVRFUl9NQVJHSU4gKiAyfXB4KWA7XHJcbiAgICAgIHJldHVybiBmYWxsYmFjaztcclxuICAgIH1cclxuICAgIGNvbnN0IHZpZXdwb3J0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IDA7XHJcbiAgICBpZiAoIXZpZXdwb3J0KSB7XHJcbiAgICAgIHJldHVybiBgY2FsYygxMDB2aCAtICR7VE9QQkFSX0hFSUdIVCArIE9VVEVSX01BUkdJTiAqIDJ9cHgpYDtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlY29yZGVyU3BhY2UgPSByZWNvcmRlck9wZW4gPyByZWNvcmRlckhlaWdodFB4ICsgUkVDT1JERVJfR0FQIDogMDtcclxuICAgIGNvbnN0IGF2YWlsYWJsZSA9IE1hdGgubWF4KHZpZXdwb3J0IC0gVE9QQkFSX0hFSUdIVCAtIE9VVEVSX01BUkdJTiAqIDIgLSByZWNvcmRlclNwYWNlLCBNSU5fRURJVE9SX0hFSUdIVCk7XHJcbiAgICByZXR1cm4gYCR7YXZhaWxhYmxlfXB4YDtcclxuICB9LCBbcmVjb3JkZXJPcGVuLCByZWNvcmRlckhlaWdodFB4XSk7XHJcblxyXG4gIGNvbnN0IFtlZGl0b3JIZWlnaHQsIHNldEVkaXRvckhlaWdodF0gPSB1c2VTdGF0ZSgoKSA9PiBjb21wdXRlRWRpdG9ySGVpZ2h0KCkpO1xyXG5cclxuICBjb25zdCBbdGV4dCwgc2V0VGV4dF0gPSB1c2VTdGF0ZSgoKSA9PiB7XG4gICAgY29uc3Qgc3RvcmVkID0gc2FmZUdldFNlc3Npb25WYWx1ZShzdG9yYWdlS2V5KTtcbiAgICBjb25zdCBpbml0aWFsVGV4dCA9IHN0b3JlZCAhPT0gbnVsbCA/IHN0b3JlZCA6IFN0cmluZyhpbml0aWFsVmFsdWUgfHwgXCJcIik7XG4gICAgaW5pdGlhbFRleHRSZWYuY3VycmVudCA9IGluaXRpYWxUZXh0O1xuICAgIHJldHVybiBpbml0aWFsVGV4dDtcbiAgfSk7XG5cbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gIWlzUmVhZE9ubHkgJiYgKGlzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nIHx8IHRleHQgIT09IChpbml0aWFsVGV4dFJlZi5jdXJyZW50ID8/IFwiXCIpKSxcbiAgICBbaXNSZWFkT25seSwgaXNUcmFuc2NyaWJpbmcsIGlzVHlwaW5nLCB0ZXh0XVxuICApO1xuXHJcbiAgY29uc3Qgc3RvcFR5cGluZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICh0eXBpbmdUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0eXBpbmdUaW1lclJlZi5jdXJyZW50KTtcclxuICAgICAgdHlwaW5nVGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICB0eXBpbmdUZXh0UmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgdHlwaW5nSW5kZXhSZWYuY3VycmVudCA9IDA7XHJcbiAgICBzZXRJc1R5cGluZyhmYWxzZSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBzdGFydFR5cGluZyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGZ1bGxUZXh0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRleHRWYWx1ZSA9IFN0cmluZyhmdWxsVGV4dCB8fCBcIlwiKTtcclxuICAgICAgc3RvcFR5cGluZygpO1xyXG4gICAgICBpZiAoIXRleHRWYWx1ZSkge1xyXG4gICAgICAgIHNldFRleHQoXCJcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0eXBpbmdUZXh0UmVmLmN1cnJlbnQgPSB0ZXh0VmFsdWU7XHJcbiAgICAgIHR5cGluZ0luZGV4UmVmLmN1cnJlbnQgPSAwO1xyXG4gICAgICBzZXRJc1R5cGluZyh0cnVlKTtcclxuICAgICAgc2V0VGV4dChcIlwiKTtcclxuXHJcbiAgICAgIGNvbnN0IHRvdGFsID0gdGV4dFZhbHVlLmxlbmd0aDtcclxuICAgICAgY29uc3QgbWF4U3RlcHMgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKFRZUEVfVEFSR0VUX01TIC8gVFlQRV9JTlRFUlZBTF9NUykpO1xyXG4gICAgICBjb25zdCBzdGVwU2l6ZSA9IE1hdGgubWluKFRZUEVfTUFYX1NURVAsIE1hdGgubWF4KFRZUEVfTUlOX1NURVAsIE1hdGguY2VpbCh0b3RhbCAvIG1heFN0ZXBzKSkpO1xyXG5cclxuICAgICAgY29uc3QgdGljayA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0ID0gTWF0aC5taW4odHlwaW5nSW5kZXhSZWYuY3VycmVudCArIHN0ZXBTaXplLCB0b3RhbCk7XHJcbiAgICAgICAgdHlwaW5nSW5kZXhSZWYuY3VycmVudCA9IG5leHQ7XHJcbiAgICAgICAgc2V0VGV4dCh0eXBpbmdUZXh0UmVmLmN1cnJlbnQuc2xpY2UoMCwgbmV4dCkpO1xyXG4gICAgICAgIGlmIChuZXh0IDwgdG90YWwpIHtcclxuICAgICAgICAgIHR5cGluZ1RpbWVyUmVmLmN1cnJlbnQgPSBzZXRUaW1lb3V0KHRpY2ssIFRZUEVfSU5URVJWQUxfTVMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0eXBpbmdUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICAgIHNldElzVHlwaW5nKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0eXBpbmdUaW1lclJlZi5jdXJyZW50ID0gc2V0VGltZW91dCh0aWNrLCBUWVBFX0lOVEVSVkFMX01TKTtcclxuICAgIH0sXHJcbiAgICBbc3RvcFR5cGluZ11cclxuICApO1xyXG5cclxuICAvLyBTZW5kIHRoZSBXQVYgdG8gTVZDIGFuZCByZXBsYWNlIHRleHRhcmVhIHdpdGggdGhlIHRyYW5zY3JpcHRpb24uXHJcbiAgY29uc3QgaGFuZGxlVHJhbnNjcmliZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKHdhdkJsb2IpID0+IHtcclxuICAgICAgaWYgKCF3YXZCbG9iIHx8IGlzVHJhbnNjcmliaW5nKSByZXR1cm47XHJcblxyXG4gICAgICAvLyBMb2NrIHRoZSBlZGl0b3Igd2hpbGUgdGhlIHRyYW5zY3JpcHRpb24gcmVxdWVzdCBpcyBpbiBmbGlnaHQuXHJcbiAgICAgIHNldElzVHJhbnNjcmliaW5nKHRydWUpO1xyXG4gICAgICBzZXRUcmFuc2NyaWJlRXJyb3IoXCJcIik7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIC8vIEJ1aWxkIG11bHRpcGFydCBmb3JtIHBheWxvYWQgZXhwZWN0ZWQgYnkgL1Zpc2l0YXMvVHJhbnNjcmliZVNwZWVjaC5cclxuICAgICAgICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZm9ybS5hcHBlbmQoXCJsYW5ndWFnZUlkXCIsIFwiYXV0b1wiKTtcclxuICAgICAgICBmb3JtLmFwcGVuZChcImF1ZGlvRmlsZVwiLCB3YXZCbG9iLCBcImF1ZGlvLndhdlwiKTtcclxuICAgICAgICBpZiAocmVzb2x2ZWRSZXR1cm5VcmwpIHtcclxuICAgICAgICAgIGZvcm0uYXBwZW5kKFwicmV0dXJuVXJsXCIsIHJlc29sdmVkUmV0dXJuVXJsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNzcmZUb2tlbiA9IGdldENzcmZUb2tlbigpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7XHJcbiAgICAgICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgXCJYLVJlcXVlc3RlZC1XaXRoXCI6IFwiWE1MSHR0cFJlcXVlc3RcIixcclxuICAgICAgICAgIC4uLihjc3JmVG9rZW4gPyB7IFJlcXVlc3RWZXJpZmljYXRpb25Ub2tlbjogY3NyZlRva2VuIH0gOiB7fSksXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2VuZCB0aGUgV0FWIHRvIE1WQyAoc2VydmVyIHdpbGwgY2FsbCB0aGUgc3BlZWNoIEFQSSkuXHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSByZXNvbHZlZFJldHVyblVybCA/IGA/cmV0dXJuVXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHJlc29sdmVkUmV0dXJuVXJsKX1gIDogXCJcIjtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvVmlzaXRhcy9UcmFuc2NyaWJlU3BlZWNoJHtxdWVyeX1gLCB7XHJcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgYm9keTogZm9ybSxcclxuICAgICAgICAgIGhlYWRlcnMsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gbnVsbCk7XHJcbiAgICAgICAgY29uc3Qgb2sgPSByZXNwb25zZS5vayAmJiBwYXlsb2FkICYmIHBheWxvYWQuc3VjY2VzcyA9PT0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKCFvaykge1xyXG4gICAgICAgICAgY29uc3QgbXNnID0gcGF5bG9hZCAmJiBwYXlsb2FkLm1lc3NhZ2UgPyBTdHJpbmcocGF5bG9hZC5tZXNzYWdlKSA6IGluZFQoXCJUZXh0RWRpdG9yX1RyYW5zY3JpYmVGYWlsZWRcIiwgXCJUcmFuc2NyaWJlIGZhaWxlZC5cIik7XHJcbiAgICAgICAgICBzZXRUcmFuc2NyaWJlRXJyb3IobXNnKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRyYW5zY3JpcHQgPSBwYXlsb2FkICYmIHR5cGVvZiBwYXlsb2FkLmRhdGEgPT09IFwic3RyaW5nXCIgPyBwYXlsb2FkLmRhdGEgOiBcIlwiO1xyXG4gICAgICAgIGlmICghdHJhbnNjcmlwdC50cmltKCkpIHtcclxuICAgICAgICAgIHNldFRyYW5zY3JpYmVFcnJvcihpbmRUKFwiVGV4dEVkaXRvcl9UcmFuc2NyaWJlRmFpbGVkXCIsIFwiVHJhbnNjcmliZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlcGxhY2UgdGhlIGZ1bGwgdGV4dGFyZWEgY29udGVudCB3aXRoIHRoZSBuZXcgdHJhbnNjcmlwdGlvbi5cclxuICAgICAgICBzdGFydFR5cGluZyh0cmFuc2NyaXB0KTtcclxuICAgICAgICAvLyBIaWRlIHRoZSByZWNvcmRlciBhZnRlciBhIHN1Y2Nlc3NmdWwgdHJhbnNjcmlwdGlvbi5cclxuICAgICAgICBzZXRSZWNvcmRlck9wZW4oZmFsc2UpO1xyXG4gICAgICAgIHNldFJlY29yZGVyUmVzZXRLZXkoKGspID0+IGsgKyAxKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc3QgbXNnID0gZXJyICYmIGVyci5tZXNzYWdlID8gU3RyaW5nKGVyci5tZXNzYWdlKSA6IGluZFQoXCJUZXh0RWRpdG9yX1RyYW5zY3JpYmVGYWlsZWRcIiwgXCJUcmFuc2NyaWJlIGZhaWxlZC5cIik7XHJcbiAgICAgICAgc2V0VHJhbnNjcmliZUVycm9yKG1zZyk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgLy8gUmUtZW5hYmxlIHRoZSBlZGl0b3IgYWZ0ZXIgY29tcGxldGlvbi5cclxuICAgICAgICBzZXRJc1RyYW5zY3JpYmluZyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbaXNUcmFuc2NyaWJpbmcsIHN0YXJ0VHlwaW5nXVxyXG4gICk7XHJcblxyXG4gIC8vIENsZWFyIHRyYW5zY3JpcHRpb24gZXJyb3JzIHdoZW4gYXVkaW8gY2hhbmdlcy5cclxuICBjb25zdCBoYW5kbGVBdWRpb0NsZWFyZWQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0VHJhbnNjcmliZUVycm9yKFwiXCIpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlUmVjb3JkaW5nRXJyb3IgPSB1c2VDYWxsYmFjaygobWVzc2FnZSkgPT4ge1xuICAgIC8vIFNob3cgYSB3YXJuaW5nIGFjdGlvbiBtYXJrOyBrZWVwIHRoZSByZWNvcmRlciBvcGVuIHRvIGRpc3BsYXkgdGhlIGVycm9yIGxhYmVsLlxuICAgIHRyeSB7XG4gICAgICBpZiAod2luZG93LklORCAmJiB0eXBlb2Ygd2luZG93LklORC5mbGFzaEFjdGlvbk1hcmsgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB3aW5kb3cuSU5ELmZsYXNoQWN0aW9uTWFyayh7IHR5cGU6IFwid2FybmluZ1Byb2Nlc3NcIiwgZHVyYXRpb25NczogMTUwMCB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIGlnbm9yZVxuICAgIH1cbiAgfSwgW10pO1xuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgdXBkYXRlSGVpZ2h0ID0gKCkgPT4ge1xyXG4gICAgICBzZXRFZGl0b3JIZWlnaHQoY29tcHV0ZUVkaXRvckhlaWdodCgpKTtcclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlSGVpZ2h0KCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVIZWlnaHQpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCB1cGRhdGVIZWlnaHQpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlSGVpZ2h0KTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCB1cGRhdGVIZWlnaHQpO1xyXG4gICAgfTtcclxuICB9LCBbY29tcHV0ZUVkaXRvckhlaWdodF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICBpZiAoIXJlY29yZGVyT3Blbikge1xyXG4gICAgICBzZXRSZWNvcmRlckhlaWdodFB4KDApO1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVsID0gcmVjb3JkZXJCb3hSZWYuY3VycmVudDtcclxuICAgIGlmICghZWwpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3QgbWVhc3VyZSA9ICgpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgc2V0UmVjb3JkZXJIZWlnaHRQeChNYXRoLm1heCgwLCBNYXRoLmZsb29yKHJlY3QuaGVpZ2h0KSkpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICAvKiBpZ25vcmUgKi9cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBtZWFzdXJlKCk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBSZXNpemVPYnNlcnZlciAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICBjb25zdCBybyA9IG5ldyBSZXNpemVPYnNlcnZlcihtZWFzdXJlKTtcclxuICAgICAgcm8ub2JzZXJ2ZShlbCk7XHJcbiAgICAgIHJldHVybiAoKSA9PiByby5kaXNjb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgbWVhc3VyZSk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgbWVhc3VyZSk7XHJcbiAgfSwgW3JlY29yZGVyT3Blbl0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4gc3RvcFR5cGluZywgW3N0b3BUeXBpbmddKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHdpbmRvdy5fX2luZFNldE5hdmlnYXRpb25HdWFyZD8uKGhhc0FjdGl2ZVByb2Nlc3MpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XG4gICAgfTtcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWlzVHlwaW5nKSByZXR1cm47XHJcbiAgICBjb25zdCBlbCA9IHRleHRhcmVhUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWVsKSByZXR1cm47XHJcbiAgICBlbC5zY3JvbGxUb3AgPSBlbC5zY3JvbGxIZWlnaHQ7XHJcbiAgfSwgW2lzVHlwaW5nLCB0ZXh0XSk7XHJcblxyXG4gIGNvbnN0IHRvZ2dsZVJlY29yZGVyID0gKCkgPT4ge1xyXG4gICAgaWYgKGlzUmVhZE9ubHkgfHwgaXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmcpIHJldHVybjtcclxuICAgIHNldFRyYW5zY3JpYmVFcnJvcihcIlwiKTtcclxuICAgIHNldFJlY29yZGVyT3Blbigob3BlbikgPT4ge1xyXG4gICAgICBpZiAob3Blbikgc2V0UmVjb3JkZXJSZXNldEtleSgoaykgPT4gayArIDEpO1xyXG4gICAgICByZXR1cm4gIW9wZW47XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBjb25zdCBhbGxvd0hpc3RvcnlOYXYgPSAoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuX19pbmRBbGxvd0hpc3RvcnlPbmNlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgd2luZG93Ll9faW5kQWxsb3dIaXN0b3J5T25jZSgpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9O1xyXG5cclxuICBjb25zdCBlbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFjYW5FZGl0IHx8ICFpc1JlYWRPbmx5KSByZXR1cm47XHJcbiAgICBzZXRJc1JlYWRPbmx5KGZhbHNlKTtcclxuICAgIGlmIChub3JtYWxpemVkRWRpdE1vZGVLZXkpIHNhZmVTZXRTZXNzaW9uVmFsdWUobm9ybWFsaXplZEVkaXRNb2RlS2V5LCBcInRydWVcIik7XHJcbiAgfSwgW2NhbkVkaXQsIGlzUmVhZE9ubHksIG5vcm1hbGl6ZWRFZGl0TW9kZUtleV0pO1xyXG5cclxuICBjb25zdCBwZXJzaXN0RHJhZnQgPSAoKSA9PiB7XHJcbiAgICAvLyBQZXJzaXN0IHRoZSBkcmFmdCBzbyB0aGUgcHJldmlvdXMgcGFnZSBjYW4gcmVzdG9yZSBpdC5cclxuICAgIHNhZmVTZXRTZXNzaW9uVmFsdWUoc3RvcmFnZUtleSwgdGV4dCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZ29CYWNrID0gKCkgPT4ge1xyXG4gICAgcGVyc2lzdERyYWZ0KCk7XHJcbiAgICBpZiAocmVzb2x2ZWRSZXR1cm5VcmwpIHtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNvbHZlZFJldHVyblVybDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHdpbmRvdy5oaXN0b3J5Lmxlbmd0aCA+IDEgJiYgYWxsb3dIaXN0b3J5TmF2KCkpIHJldHVybjtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBnb0JhY2tBZnRlclNhdmUgPSAoKSA9PiB7XHJcbiAgICAvLyBQcmVmZXIgcmV0dXJuVXJsIGZvciBkZXRlcm1pbmlzdGljIG5hdmlnYXRpb24gYWNyb3NzIGJyb3dzZXJzLlxyXG4gICAgaWYgKHJlc29sdmVkUmV0dXJuVXJsKSB7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzb2x2ZWRSZXR1cm5Vcmw7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh3aW5kb3cuaGlzdG9yeS5sZW5ndGggPiAxICYmIGFsbG93SGlzdG9yeU5hdigpKSByZXR1cm47XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgb25TYXZlID0gKCkgPT4ge1xuICAgIGlmIChpc1JlYWRPbmx5IHx8IGlzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nKSByZXR1cm47XG4gICAgc2FmZVNldFNlc3Npb25WYWx1ZShzdG9yYWdlS2V5LCB0ZXh0KTtcbiAgICBpZiAobm9ybWFsaXplZEVkaXRNb2RlS2V5KSB7XG4gICAgICBzYWZlU2V0U2Vzc2lvblZhbHVlKG5vcm1hbGl6ZWRFZGl0TW9kZUtleSwgXCJ0cnVlXCIpO1xuICAgICAgc2FmZVNldFNlc3Npb25WYWx1ZShgJHtub3JtYWxpemVkRWRpdE1vZGVLZXl9X3JldHVybmAsIFwiMVwiKTtcbiAgICB9XG4gICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gICAgZ29CYWNrQWZ0ZXJTYXZlKCk7XG4gIH07XG5cbiAgLy8gUmVzdG9yZSB0aGUgaW5pdGlhbCB0ZXh0IHZhbHVlIGZvciB0aGlzIHNlc3Npb24gd2l0aG91dCBzYXZpbmcuXG4gIGNvbnN0IG9uQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaXNSZWFkT25seSB8fCBpc1RyYW5zY3JpYmluZyB8fCBpc1R5cGluZykgcmV0dXJuO1xuICAgIHN0b3BUeXBpbmcoKTtcbiAgICBzZXRUcmFuc2NyaWJlRXJyb3IoXCJcIik7XG4gICAgY29uc3QgaW5pdGlhbFRleHQgPSBpbml0aWFsVGV4dFJlZi5jdXJyZW50ID8/IFwiXCI7XG4gICAgc2V0VGV4dChpbml0aWFsVGV4dCk7XG4gICAgc2FmZVNldFNlc3Npb25WYWx1ZShzdG9yYWdlS2V5LCBpbml0aWFsVGV4dCk7XG4gICAgaWYgKG5vcm1hbGl6ZWRFZGl0TW9kZUtleSkge1xuICAgICAgc2FmZVJlbW92ZVNlc3Npb25WYWx1ZShgJHtub3JtYWxpemVkRWRpdE1vZGVLZXl9X3JldHVybmApO1xuICAgICAgc2FmZVJlbW92ZVNlc3Npb25WYWx1ZShub3JtYWxpemVkRWRpdE1vZGVLZXkpO1xuICAgIH1cbiAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcbiAgICBnb0JhY2tBZnRlclNhdmUoKTtcbiAgfSwgW2lzUmVhZE9ubHksIGlzVHJhbnNjcmliaW5nLCBpc1R5cGluZywgc3RvcFR5cGluZywgc3RvcmFnZUtleSwgZ29CYWNrQWZ0ZXJTYXZlLCBub3JtYWxpemVkRWRpdE1vZGVLZXldKTtcblxyXG4gIGNvbnN0IGVkaXRvckJveENsYXNzID0gaXNSZWFkT25seVxuICAgID8gXCJyZWxhdGl2ZSByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy1zbGF0ZS0xMDAgc2hhZG93LWxnIG92ZXJmbG93LWhpZGRlbiBmb2N1cy13aXRoaW46cmluZy00IGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkvNDAgZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5XCJcbiAgICA6IFwicmVsYXRpdmUgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgYmctd2hpdGUgc2hhZG93LWxnIG92ZXJmbG93LWhpZGRlbiBmb2N1cy13aXRoaW46cmluZy00IGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkvNDAgZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5XCI7XG4gIGNvbnN0IG1pY0Rpc2FibGVkID0gaXNSZWFkT25seSB8fCBpc1RyYW5zY3JpYmluZyB8fCBpc1R5cGluZztcbiAgY29uc3QgbWljUmVhZE9ubHlIaW50ID0gaW5kVChcIlRleHRFZGl0b3JfTWljcm9waG9uZV9SZWFkT25seUhpbnRcIiwgXCJBdWRpbyB0cmFuc2NyaXB0aW9uIGlzIGF2YWlsYWJsZSBvbmx5IGluIGVkaXQgbW9kZS5cIik7XG4gIGNvbnN0IG1pY0Jhc2VMYWJlbCA9IGluZFQoXCJUZXh0RWRpdG9yX01pY3JvcGhvbmVcIiwgXCJNaWNyb3Bob25lXCIpO1xuICBjb25zdCBtaWNBcmlhTGFiZWwgPSBpc1JlYWRPbmx5ID8gYCR7bWljQmFzZUxhYmVsfS4gJHttaWNSZWFkT25seUhpbnR9YCA6IG1pY0Jhc2VMYWJlbDtcbiAgY29uc3QgbWljVG9vbHRpcCA9IGlzUmVhZE9ubHkgPyBtaWNSZWFkT25seUhpbnQgOiBtaWNCYXNlTGFiZWw7XG4gIGNvbnN0IG1pY0J1dHRvbkNsYXNzID0gYGFic29sdXRlIHRvcC0wIHJpZ2h0LTAgei0yMCBpbmxpbmUtZmxleCBoLVs3MHB4XSB3LVs3MHB4XSBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgb3ZlcmZsb3ctdmlzaWJsZSBiZy10cmFuc3BhcmVudCBwLTAgbS0wIGJvcmRlci0wIHJvdW5kZWQtbm9uZSB0ZXh0LXByaW1hcnkgc2hhZG93LW5vbmUgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0wIGZvY3VzOnJpbmctb2Zmc2V0LTAke1xuICAgIG1pY0Rpc2FibGVkXG4gICAgICA/IGlzUmVhZE9ubHlcbiAgICAgICAgPyBcIiBvcGFjaXR5LTcwIGN1cnNvci1ub3QtYWxsb3dlZCB0ZXh0LXNsYXRlLTQwMFwiXG4gICAgICAgIDogXCIgb3BhY2l0eS03MCBjdXJzb3Itbm90LWFsbG93ZWQgdGV4dC1wcmltYXJ5LzYwXCJcbiAgICAgIDogXCIgaG92ZXI6dGV4dC1wcmltYXJ5LzgwXCJcbiAgfWA7XG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gaC1kdmggdy1mdWxsIGZsZXggZmxleC1jb2wgYmctc2xhdGUtMjAwXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wYmFyIHNoYWRvdy1tZFwiPlxyXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJ0b3BiYXItYnRuXCJcbiAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiVG9wYmFyX0JhY2tcIiwgXCJCYWNrXCIpfVxuICAgICAgICAgIG9uQ2xpY2s9e2dvQmFja31cbiAgICAgICAgPlxuICAgICAgICAgIDxDaGV2cm9uTGVmdEljb24gY2xhc3NOYW1lPVwiaC02IHctNlwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgIDwvYnV0dG9uPlxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BiYXItY2VudGVyIGZsZXgtMSBmbGV4IGp1c3RpZnktY2VudGVyIHBvaW50ZXItZXZlbnRzLW5vbmUgcHgtMlwiPlxyXG4gICAgICAgICAgPHNwYW4gaWQ9XCJ0b3BiYXJUaXRsZVwiIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+XHJcbiAgICAgICAgICAgIHtmaWVsZExhYmVsfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7aXNSZWFkT25seSA/IChcclxuICAgICAgICAgIGNhbkVkaXQgPyAoXHJcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRvcGJhci1idG5cIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0VkaXRcIiwgXCJFZGl0XCIpfVxuICAgICAgICAgICAgICBvbkNsaWNrPXtlbmFibGVFZGl0fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzc05hbWU9XCJoLTYgdy02XCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xNi44NjIgNC40ODcgMS42ODctMS42ODhhMS44NzUgMS44NzUgMCAxIDEgMi42NTIgMi42NTJMNi44MzIgMTkuODJhNC41IDQuNSAwIDAgMS0xLjg5NyAxLjEzbC0yLjY4NS44LjgtMi42ODVhNC41IDQuNSAwIDAgMSAxLjEzLTEuODk3TDE2Ljg2MyA0LjQ4N1ptMCAwTDE5LjUgNy4xMjVcIiAvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8ZGl2IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHN0eWxlPXt7IHdpZHRoOiBcIjI1cHhcIiwgaGVpZ2h0OiBcIjI1cHhcIiB9fSAvPlxuICAgICAgICAgIClcbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC1bMTRweF0gcHItMVwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidG9wYmFyLWJ0blwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIil9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uU2F2ZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTYgdy02XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtNC41IDEyLjc1IDYgNiA5LTEzLjVcIiAvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidG9wYmFyLWJ0blwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpfVxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNhbmNlbEVkaXR9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPVwiMS41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC02IHctNlwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTYgMTggMTggNk02IDZsMTIgMTJcIiAvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgbWluLWgtMCB3LWZ1bGwgcHgtNCBwYi00IHB0LTNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy0zeGwgbXgtYXV0b1wiIHN0eWxlPXt7IG1hcmdpblRvcDogYCR7T1VURVJfTUFSR0lOfXB4YCwgbWFyZ2luQm90dG9tOiBgJHtPVVRFUl9NQVJHSU59cHhgIH19PlxyXG4gICAgICAgICAge3JlY29yZGVyT3BlbiAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgcmVmPXtyZWNvcmRlckJveFJlZn0gY2xhc3NOYW1lPVwibWItMyB3LWZ1bGxcIj5cclxuICAgICAgICAgICAgICA8QXVkaW9SZWNvcmRlck1pbmltYWxcbiAgICAgICAgICAgICAgICBrZXk9e3JlY29yZGVyUmVzZXRLZXl9XG4gICAgICAgICAgICAgICAgZW1iZWRkZWRcbiAgICAgICAgICAgICAgICBvblRyYW5zY3JpYmU9e2hhbmRsZVRyYW5zY3JpYmV9XG4gICAgICAgICAgICAgICAgdHJhbnNjcmliZUJ1c3k9e2lzVHJhbnNjcmliaW5nfVxuICAgICAgICAgICAgICAgIHRyYW5zY3JpYmVMYWJlbD17aW5kVChcIlRleHRFZGl0b3JfVHJhbnNjcmliZVwiLCBcIlRyYW5zY3JpYmVcIil9XG4gICAgICAgICAgICAgICAgdHJhbnNjcmliZUJ1c3lMYWJlbD17aW5kVChcIlRleHRFZGl0b3JfVHJhbnNjcmliaW5nXCIsIFwiVHJhbnNjcmliaW5nXCIpfVxuICAgICAgICAgICAgICAgIG9uQXVkaW9DbGVhcmVkPXtoYW5kbGVBdWRpb0NsZWFyZWR9XG4gICAgICAgICAgICAgICAgb25SZWNvcmRpbmdFcnJvcj17aGFuZGxlUmVjb3JkaW5nRXJyb3J9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXHJcbiAgICAgICAgICB7dHJhbnNjcmliZUVycm9yID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTMgdGV4dC14cyB0ZXh0LXJvc2UtNzAwIHRleHQtY2VudGVyXCI+e3RyYW5zY3JpYmVFcnJvcn08L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtlZGl0b3JCb3hDbGFzc30+XHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYVxyXG4gICAgICAgICAgICAgIHJlZj17dGV4dGFyZWFSZWZ9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHJlc2l6ZS1ub25lIGJnLXRyYW5zcGFyZW50IHB4LTUgcGItNSBwdC0xMCBwci0xNCBmb2N1czpvdXRsaW5lLWhpZGRlbiAke2lzUmVhZE9ubHkgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwifWB9XG4gICAgICAgICAgICAgIHZhbHVlPXt0ZXh0fVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VGV4dChlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nfVxyXG4gICAgICAgICAgICAgIHJlYWRPbmx5PXtpc1JlYWRPbmx5IHx8IGlzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nfVxyXG4gICAgICAgICAgICAgIGFyaWEtcmVhZG9ubHk9e2lzUmVhZE9ubHkgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgICBhcmlhLWJ1c3k9e2lzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nfVxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7IGhlaWdodDogZWRpdG9ySGVpZ2h0IH19XHJcbiAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICB7aXNUcmFuc2NyaWJpbmcgPyAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHotMjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtMjAwLzgwXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGdhcC0yXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTE2IHctMTZcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzci1vbmx5XCI+e2luZFQoXCJUZXh0RWRpdG9yX1RyYW5zY3JpYmluZ1wiLCBcIlRyYW5zY3JpYmluZ1wiKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e21pY0J1dHRvbkNsYXNzfVxuICAgICAgICAgICAgYXJpYS1sYWJlbD17bWljQXJpYUxhYmVsfVxuICAgICAgICAgICAgdGl0bGU9e21pY1Rvb2x0aXB9XG4gICAgICAgICAgICBvbkNsaWNrPXt0b2dnbGVSZWNvcmRlcn1cbiAgICAgICAgICAgIGRpc2FibGVkPXttaWNEaXNhYmxlZH1cbiAgICAgICAgICAgIGFyaWEtZGlzYWJsZWQ9e21pY0Rpc2FibGVkID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpc1JlYWRPbmx5ID8gKFxuICAgICAgICAgICAgICAgICAgPExvY2tDbG9zZWRJY29uIGNsYXNzTmFtZT1cImgtNiB3LTYgcmVsYXRpdmUgei0xMFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcG9pbnRlci1ldmVudHMtbm9uZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxQdWxzZVJpbmdzTXVsdGlwbGVJY29uIHNpemU9ezI0MH0gcGFkZGluZz17MTJ9IGNvbG9yPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezJ9IG9wYWNpdHk9ezAuM30gcm90YXRpb249ezkwfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxfSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTYgdy02IHJlbGF0aXZlIHotMTBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMiAxOC43NWE2IDYgMCAwIDAgNi02di0xLjVtLTYgNy41YTYgNiAwIDAgMS02LTZ2LTEuNW02IDcuNXYzLjc1bS0zLjc1IDBoNy41TTEyIDE1Ljc1YTMgMyAwIDAgMS0zLTNWNC41YTMgMyAwIDEgMSA2IDB2OC4yNWEzIDMgMCAwIDEtMyAzWlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vLyBNb3VudCB0aGUgdGV4dCBlZGl0b3IgaW50byB0aGUgUmF6b3Igdmlldy5cclxuZXhwb3J0IGNvbnN0IG1vdW50VGV4dEVkaXRvciA9ICgpID0+IHtcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmQtdGV4dC1lZGl0b3Itcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcblxyXG4gIGNvbnN0IGZpZWxkSWQgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1maWVsZC1pZFwiKSB8fCBcIlwiO1xyXG4gIGNvbnN0IGZpZWxkTGFiZWwgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1maWVsZC1sYWJlbFwiKSB8fCBcIlwiO1xyXG4gIGNvbnN0IGluaXRpYWxWYWx1ZSA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZpZWxkLXZhbHVlXCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgcmV0dXJuVXJsID0gcm9vdEVsLmdldEF0dHJpYnV0ZShcImRhdGEtcmV0dXJuLXVybFwiKSB8fCBcIlwiO1xyXG4gIGNvbnN0IHJlYWRPbmx5QXR0ciA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXJlYWQtb25seVwiKSB8fCBcIlwiO1xyXG4gIGNvbnN0IGluaXRpYWxSZWFkT25seSA9XHJcbiAgICBwYXJzZUJvb2wocmVhZE9ubHlBdHRyKSB8fCBwYXJzZUJvb2woZ2V0UXVlcnlQYXJhbShcInJlYWRPbmx5XCIpKSB8fCBwYXJzZUJvb2woZ2V0UXVlcnlQYXJhbShcInJlYWRvbmx5XCIpKTtcclxuICBjb25zdCBhbGxvd0VkaXRBdHRyID0gcm9vdEVsLmdldEF0dHJpYnV0ZShcImRhdGEtYWxsb3ctZWRpdFwiKSB8fCBcIlwiO1xyXG4gIGNvbnN0IGFsbG93RWRpdFF1ZXJ5ID0gZ2V0UXVlcnlQYXJhbShcImFsbG93RWRpdFwiKSB8fCBnZXRRdWVyeVBhcmFtKFwiY2FuRWRpdFwiKTtcclxuICBjb25zdCBhbGxvd0VkaXQgPSBwYXJzZU9wdGlvbmFsQm9vbChhbGxvd0VkaXRRdWVyeSwgcGFyc2VPcHRpb25hbEJvb2woYWxsb3dFZGl0QXR0ciwgdHJ1ZSkpO1xyXG4gIGNvbnN0IGVkaXRNb2RlS2V5QXR0ciA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWVkaXQtbW9kZS1rZXlcIikgfHwgXCJcIjtcclxuICBjb25zdCBlZGl0TW9kZUtleSA9IGVkaXRNb2RlS2V5QXR0ciB8fCBnZXRRdWVyeVBhcmFtKFwiZWRpdE1vZGVLZXlcIikgfHwgXCJcIjtcclxuXHJcbiAgbW91bnRSZWFjdElzbGFuZChcbiAgICByb290RWwsXG4gICAgPEluZFRleHRFZGl0b3JBcHBcbiAgICAgIGZpZWxkSWQ9e2ZpZWxkSWR9XG4gICAgICBmaWVsZExhYmVsPXtmaWVsZExhYmVsfVxuICAgICAgaW5pdGlhbFZhbHVlPXtpbml0aWFsVmFsdWV9XG4gICAgICByZXR1cm5Vcmw9e3JldHVyblVybH1cbiAgICAgIGluaXRpYWxSZWFkT25seT17aW5pdGlhbFJlYWRPbmx5fVxuICAgICAgZWRpdE1vZGVLZXk9e2VkaXRNb2RlS2V5fVxuICAgICAgYWxsb3dFZGl0PXthbGxvd0VkaXR9XG4gICAgLz5cbiAgKTtcbn07XG5cbi8vIEF1dG8tbW91bnQgd2hlbiB0aGUgcGFnZSBidW5kbGUgbG9hZHMuXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgbW91bnRUZXh0RWRpdG9yKCk7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcbmV4cG9ydCBkZWZhdWx0IEluZFRleHRFZGl0b3JBcHA7XG4iLCAiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5mdW5jdGlvbiBDaGV2cm9uTGVmdEljb24oe1xuICB0aXRsZSxcbiAgdGl0bGVJZCxcbiAgLi4ucHJvcHNcbn0sIHN2Z1JlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgT2JqZWN0LmFzc2lnbih7XG4gICAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICBmaWxsOiBcIm5vbmVcIixcbiAgICB2aWV3Qm94OiBcIjAgMCAyNCAyNFwiLFxuICAgIHN0cm9rZVdpZHRoOiAxLjUsXG4gICAgc3Ryb2tlOiBcImN1cnJlbnRDb2xvclwiLFxuICAgIFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCIsXG4gICAgXCJkYXRhLXNsb3RcIjogXCJpY29uXCIsXG4gICAgcmVmOiBzdmdSZWYsXG4gICAgXCJhcmlhLWxhYmVsbGVkYnlcIjogdGl0bGVJZFxuICB9LCBwcm9wcyksIHRpdGxlID8gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aXRsZVwiLCB7XG4gICAgaWQ6IHRpdGxlSWRcbiAgfSwgdGl0bGUpIDogbnVsbCwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHtcbiAgICBzdHJva2VMaW5lY2FwOiBcInJvdW5kXCIsXG4gICAgc3Ryb2tlTGluZWpvaW46IFwicm91bmRcIixcbiAgICBkOiBcIk0xNS43NSAxOS41IDguMjUgMTJsNy41LTcuNVwiXG4gIH0pKTtcbn1cbmNvbnN0IEZvcndhcmRSZWYgPSAvKiNfX1BVUkVfXyovIFJlYWN0LmZvcndhcmRSZWYoQ2hldnJvbkxlZnRJY29uKTtcbmV4cG9ydCBkZWZhdWx0IEZvcndhcmRSZWY7IiwgImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuZnVuY3Rpb24gTG9ja0Nsb3NlZEljb24oe1xuICB0aXRsZSxcbiAgdGl0bGVJZCxcbiAgLi4ucHJvcHNcbn0sIHN2Z1JlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgT2JqZWN0LmFzc2lnbih7XG4gICAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICBmaWxsOiBcIm5vbmVcIixcbiAgICB2aWV3Qm94OiBcIjAgMCAyNCAyNFwiLFxuICAgIHN0cm9rZVdpZHRoOiAxLjUsXG4gICAgc3Ryb2tlOiBcImN1cnJlbnRDb2xvclwiLFxuICAgIFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCIsXG4gICAgXCJkYXRhLXNsb3RcIjogXCJpY29uXCIsXG4gICAgcmVmOiBzdmdSZWYsXG4gICAgXCJhcmlhLWxhYmVsbGVkYnlcIjogdGl0bGVJZFxuICB9LCBwcm9wcyksIHRpdGxlID8gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aXRsZVwiLCB7XG4gICAgaWQ6IHRpdGxlSWRcbiAgfSwgdGl0bGUpIDogbnVsbCwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHtcbiAgICBzdHJva2VMaW5lY2FwOiBcInJvdW5kXCIsXG4gICAgc3Ryb2tlTGluZWpvaW46IFwicm91bmRcIixcbiAgICBkOiBcIk0xNi41IDEwLjVWNi43NWE0LjUgNC41IDAgMSAwLTkgMHYzLjc1bS0uNzUgMTEuMjVoMTAuNWEyLjI1IDIuMjUgMCAwIDAgMi4yNS0yLjI1di02Ljc1YTIuMjUgMi4yNSAwIDAgMC0yLjI1LTIuMjVINi43NWEyLjI1IDIuMjUgMCAwIDAtMi4yNSAyLjI1djYuNzVhMi4yNSAyLjI1IDAgMCAwIDIuMjUgMi4yNVpcIlxuICB9KSk7XG59XG5jb25zdCBGb3J3YXJkUmVmID0gLyojX19QVVJFX18qLyBSZWFjdC5mb3J3YXJkUmVmKExvY2tDbG9zZWRJY29uKTtcbmV4cG9ydCBkZWZhdWx0IEZvcndhcmRSZWY7IiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBQdWxzZVJpbmdzTXVsdGlwbGVJY29uUHJvcHMgPSB7XG4gIHNpemU/OiBudW1iZXIgfCBzdHJpbmc7XG4gIGNvbG9yPzogc3RyaW5nO1xuICBzdHJva2VXaWR0aD86IG51bWJlcjtcbiAgYmFja2dyb3VuZD86IHN0cmluZztcbiAgb3BhY2l0eT86IG51bWJlcjtcbiAgcm90YXRpb24/OiBudW1iZXI7XG4gIHNoYWRvdz86IG51bWJlcjtcbiAgZmxpcEhvcml6b250YWw/OiBib29sZWFuO1xuICBmbGlwVmVydGljYWw/OiBib29sZWFuO1xuICBwYWRkaW5nPzogbnVtYmVyO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG4vLyBQdWxzZSByaW5ncyBpY29uIHdpdGggQ1NTIGFuaW1hdGlvbiB0byBhdm9pZCBTTUlMIGNvbXBhdGliaWxpdHkgaXNzdWVzLlxuY29uc3QgUHVsc2VSaW5nc011bHRpcGxlSWNvbiA9ICh7XG4gIHNpemUsXG4gIGNvbG9yID0gXCJjdXJyZW50Q29sb3JcIixcbiAgc3Ryb2tlV2lkdGggPSAyLFxuICBiYWNrZ3JvdW5kID0gXCJ0cmFuc3BhcmVudFwiLFxuICBvcGFjaXR5ID0gMC40LFxuICByb3RhdGlvbiA9IDkwLFxuICBzaGFkb3cgPSAwLFxuICBmbGlwSG9yaXpvbnRhbCA9IGZhbHNlLFxuICBmbGlwVmVydGljYWwgPSBmYWxzZSxcbiAgcGFkZGluZyA9IDEyLFxuICBjbGFzc05hbWUsXG59OiBQdWxzZVJpbmdzTXVsdGlwbGVJY29uUHJvcHMpID0+IHtcbiAgY29uc3QgdHJhbnNmb3JtcyA9IFtdO1xuICBpZiAocm90YXRpb24gIT09IDApIHRyYW5zZm9ybXMucHVzaChgcm90YXRlKCR7cm90YXRpb259ZGVnKWApO1xuICBpZiAoZmxpcEhvcml6b250YWwpIHRyYW5zZm9ybXMucHVzaChcInNjYWxlWCgtMSlcIik7XG4gIGlmIChmbGlwVmVydGljYWwpIHRyYW5zZm9ybXMucHVzaChcInNjYWxlWSgtMSlcIik7XG5cbiAgY29uc3Qgdmlld0JveFNpemUgPSAyNCArIHBhZGRpbmcgKiAyO1xuICBjb25zdCB2aWV3Qm94T2Zmc2V0ID0gLXBhZGRpbmc7XG4gIGNvbnN0IHZpZXdCb3ggPSBgJHt2aWV3Qm94T2Zmc2V0fSAke3ZpZXdCb3hPZmZzZXR9ICR7dmlld0JveFNpemV9ICR7dmlld0JveFNpemV9YDtcbiAgY29uc3QgcmluZ1BhdGggPVxuICAgIFwiTTEyLDFBMTEsMTEsMCwxLDAsMjMsMTIsMTEsMTEsMCwwLDAsMTIsMVptMCwyMGE5LDksMCwxLDEsOS05QTksOSwwLDAsMSwxMiwyMVpcIjtcblxuICByZXR1cm4gKFxuICAgIDxzdmdcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgdmlld0JveD17dmlld0JveH1cbiAgICAgIHdpZHRoPXtzaXplfVxuICAgICAgaGVpZ2h0PXtzaXplfVxuICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgc3Ryb2tlPXtjb2xvcn1cbiAgICAgIHN0cm9rZVdpZHRoPXtzdHJva2VXaWR0aH1cbiAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgb3BhY2l0eSxcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm1zLmpvaW4oXCIgXCIpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgZmlsdGVyOiBzaGFkb3cgPiAwID8gYGRyb3Atc2hhZG93KDAgJHtzaGFkb3d9cHggJHtzaGFkb3cgKiAyfXB4IHJnYmEoMCwwLDAsMC4zKSlgIDogdW5kZWZpbmVkLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmQgIT09IFwidHJhbnNwYXJlbnRcIiA/IGJhY2tncm91bmQgOiB1bmRlZmluZWQsXG4gICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgIH19XG4gICAgPlxuICAgICAgPHBhdGggY2xhc3NOYW1lPVwiaW5kLXB1bHNlLXJpbmctLWJhc2VcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgZD17cmluZ1BhdGh9IC8+XG4gICAgICA8cGF0aCBjbGFzc05hbWU9XCJpbmQtcHVsc2UtcmluZ1wiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPXtyaW5nUGF0aH0gLz5cbiAgICAgIDxwYXRoIGNsYXNzTmFtZT1cImluZC1wdWxzZS1yaW5nIGluZC1wdWxzZS1yaW5nLS1kZWxheS0xXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9e3JpbmdQYXRofSAvPlxuICAgICAgPHBhdGggY2xhc3NOYW1lPVwiaW5kLXB1bHNlLXJpbmcgaW5kLXB1bHNlLXJpbmctLWRlbGF5LTJcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgZD17cmluZ1BhdGh9IC8+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWxzZVJpbmdzTXVsdGlwbGVJY29uO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUF5RTs7O0FDQXpFLFlBQXVCO0FBQ3ZCLFNBQVMsZ0JBQWdCO0FBQUEsRUFDdkI7QUFBQSxFQUNBO0FBQUEsRUFDQSxHQUFHO0FBQ0wsR0FBRyxRQUFRO0FBQ1QsU0FBb0IsZ0JBQU0sb0JBQWMsT0FBTyxPQUFPLE9BQU87QUFBQSxJQUMzRCxPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsSUFDZixhQUFhO0FBQUEsSUFDYixLQUFLO0FBQUEsSUFDTCxtQkFBbUI7QUFBQSxFQUNyQixHQUFHLEtBQUssR0FBRyxRQUFxQixnQkFBTSxvQkFBYyxTQUFTO0FBQUEsSUFDM0QsSUFBSTtBQUFBLEVBQ04sR0FBRyxLQUFLLElBQUksTUFBbUIsZ0JBQU0sb0JBQWMsUUFBUTtBQUFBLElBQ3pELGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLEdBQUc7QUFBQSxFQUNMLENBQUMsQ0FBQztBQUNKO0FBQ0EsSUFBTSxhQUEyQixnQkFBTSxpQkFBVyxlQUFlO0FBQ2pFLElBQU8sMEJBQVE7OztBQ3pCZixJQUFBQSxTQUF1QjtBQUN2QixTQUFTLGVBQWU7QUFBQSxFQUN0QjtBQUFBLEVBQ0E7QUFBQSxFQUNBLEdBQUc7QUFDTCxHQUFH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QWlCLEtBQUs7QUFDaEUsUUFBTSxpQkFBaUIsY0FBYyxXQUFXLEtBQUssY0FBYyxTQUFTO0FBQzVFLFFBQU0sWUFBWSxrQkFBa0IsZ0JBQWdCLGtCQUFrQixlQUFlLElBQUksQ0FBQztBQUMxRixRQUFNLGtCQUFrQixPQUFPLGFBQWEsb0JBQW9CLEtBQUs7QUFDckUsUUFBTSxjQUFjLG1CQUFtQixjQUFjLGFBQWEsS0FBSztBQUV2RTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUdBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLGtCQUFnQjtBQUNsQjtBQUVBLHVCQUF1QixLQUFLO0FBQzVCLElBQU8scUJBQVE7IiwKICAibmFtZXMiOiBbIlJlYWN0IiwgIkZvcndhcmRSZWYiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
