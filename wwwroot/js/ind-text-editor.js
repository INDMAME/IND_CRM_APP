import {
  AudioRecorderMinimal
} from "./chunks/chunk-SIPNQN4V.js";
import {
  require_client,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-RGGEM6AY.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/system/TextEditor.tsx
var import_react = __toESM(require_react());
var import_client = __toESM(require_client());

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
var STORAGE_PREFIX = "ind_texteditor_";
var TOPBAR_HEIGHT = 64;
var OUTER_MARGIN = 5;
var MIN_EDITOR_HEIGHT = 240;
var RECORDER_GAP = 12;
var TYPE_INTERVAL_MS = 28;
var TYPE_TARGET_MS = 4200;
var TYPE_MIN_STEP = 1;
var TYPE_MAX_STEP = 4;
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
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeSetSessionValue(key, value) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
  }
}
function safeRemoveSessionValue(key) {
  try {
    sessionStorage.removeItem(key);
  } catch {
  }
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
      const stored = sessionStorage.getItem(`${STORAGE_PREFIX}${safeId}_returnUrl`);
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
    goBackAfterSave();
  }, [isReadOnly, isTranscribing, isTyping, stopTyping, storageKey, goBackAfterSave, normalizedEditModeKey]);
  const editorBoxClass = isReadOnly ? "relative rounded-2xl border border-slate-200 bg-slate-100 shadow-lg overflow-hidden focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary" : "relative rounded-2xl border border-slate-300 bg-white shadow-lg overflow-hidden focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary";
  const micDisabled = isReadOnly || isTranscribing || isTyping;
  const micButtonClass = `absolute top-0 right-0 z-20 inline-flex h-[70px] w-[70px] items-center justify-center overflow-visible bg-transparent p-0 m-0 border-0 rounded-none text-primary shadow-none focus:outline-hidden focus:ring-0 focus:ring-offset-0${micDisabled ? " opacity-70 cursor-not-allowed" : " hover:text-primary/80"}`;
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
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "button",
          {
            type: "button",
            className: micButtonClass,
            "aria-label": indT("TextEditor_Microphone", "Microphone"),
            onClick: toggleRecorder,
            disabled: micDisabled,
            "aria-disabled": micDisabled ? "true" : void 0,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PulseRingsMultipleIcon_default, { size: 240, padding: 12, color: "currentColor", strokeWidth: 2, opacity: 0.3, rotation: 90 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1, stroke: "currentColor", className: "h-6 w-6 relative z-10", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" }) })
            ]
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
  const existing = rootEl.__indRoot;
  const element = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
  );
  if (existing) {
    existing.render(element);
    return;
  }
  const root = (0, import_client.createRoot)(rootEl);
  rootEl.__indRoot = root;
  root.render(element);
};
var mount = () => {
  mountTextEditor();
};
if (typeof document !== "undefined") {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    mount();
  } else {
    document.addEventListener("DOMContentLoaded", mount);
  }
}
var TextEditor_default = IndTextEditorApp;
export {
  TextEditor_default as default,
  mountTextEditor
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3N5c3RlbS9UZXh0RWRpdG9yLnRzeCIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGhlcm9pY29ucy9yZWFjdC8yNC9vdXRsaW5lL2VzbS9DaGV2cm9uTGVmdEljb24uanMiLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9QdWxzZVJpbmdzTXVsdGlwbGVJY29uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVJvb3QgfSBmcm9tIFwicmVhY3QtZG9tL2NsaWVudFwiO1xuaW1wb3J0IHsgQ2hldnJvbkxlZnRJY29uIH0gZnJvbSBcIkBoZXJvaWNvbnMvcmVhY3QvMjQvb3V0bGluZVwiO1xyXG5pbXBvcnQgQXVkaW9SZWNvcmRlck1pbmltYWwgZnJvbSBcIi4vQXVkaW9SZWNvcmRlck1pbmltYWwudHN4XCI7XG5pbXBvcnQgUHVsc2VSaW5nc011bHRpcGxlSWNvbiBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1B1bHNlUmluZ3NNdWx0aXBsZUljb24udHN4XCI7XG5cclxuY29uc3QgSU5EX0kxOE4gPSBnbG9iYWxUaGlzLl9fSU5EX0kxOE5fXyB8fCB7fTtcclxuY29uc3QgaW5kVCA9IChrZXksIGZhbGxiYWNrKSA9PiAoSU5EX0kxOE4gJiYgdHlwZW9mIElORF9JMThOW2tleV0gPT09IFwic3RyaW5nXCIgJiYgSU5EX0kxOE5ba2V5XSkgfHwgZmFsbGJhY2sgfHwga2V5O1xyXG5cclxuY29uc3QgU1RPUkFHRV9QUkVGSVggPSBcImluZF90ZXh0ZWRpdG9yX1wiO1xyXG5jb25zdCBUT1BCQVJfSEVJR0hUID0gNjQ7XHJcbmNvbnN0IE9VVEVSX01BUkdJTiA9IDU7XHJcbmNvbnN0IE1JTl9FRElUT1JfSEVJR0hUID0gMjQwO1xyXG5jb25zdCBSRUNPUkRFUl9HQVAgPSAxMjtcbmNvbnN0IFRZUEVfSU5URVJWQUxfTVMgPSAyODtcbmNvbnN0IFRZUEVfVEFSR0VUX01TID0gNDIwMDtcbmNvbnN0IFRZUEVfTUlOX1NURVAgPSAxO1xuY29uc3QgVFlQRV9NQVhfU1RFUCA9IDQ7XG5cbnR5cGUgSW5kUm9vdEVsZW1lbnQgPSBIVE1MRWxlbWVudCAmIHsgX19pbmRSb290PzogaW1wb3J0KFwicmVhY3QtZG9tL2NsaWVudFwiKS5Sb290IH07XG5cbi8vIFNoYXJlZCBzcGlubmVyIGZvciBsb2NhbCBsb2FkaW5nIHN0YXRlcy5cclxudHlwZSBTcGlubmVyUHJvcHMgPSB7XG4gIHNpemU/OiBzdHJpbmc7XG4gIGxhYmVsPzogc3RyaW5nO1xufTtcblxuY29uc3QgU3Bpbm5lciA9ICh7IHNpemUgPSBcImgtNiB3LTZcIiwgbGFiZWwgPSBcIlwiIH06IFNwaW5uZXJQcm9wcykgPT4gKFxuICA8c3ZnXHJcbiAgICBjbGFzc05hbWU9e2BpbmQtc3Bpbm5lciAke3NpemV9YH1cclxuICAgIHZpZXdCb3g9XCIwIDAgMjAgMjBcIlxyXG4gICAgcm9sZT1cInN0YXR1c1wiXHJcbiAgICBhcmlhLWxhYmVsPXtsYWJlbCB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gID5cclxuICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xuXG5jb25zdCBnZXRDc3JmVG9rZW4gPSAoKSA9PiB7XG4gIGNvbnN0IG1ldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJyk7XG4gIHJldHVybiBtZXRhID8gbWV0YS5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpIDogXCJcIjtcbn07XG5cclxuZnVuY3Rpb24gc2FmZUdldFNlc3Npb25WYWx1ZShrZXkpIHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2FmZVNldFNlc3Npb25WYWx1ZShrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cbn1cblxuLy8gUmVtb3ZlIGEgc2Vzc2lvbiB2YWx1ZSB3aXRob3V0IHRocm93aW5nIGZvciBibG9ja2VkIHN0b3JhZ2UuXG5mdW5jdGlvbiBzYWZlUmVtb3ZlU2Vzc2lvblZhbHVlKGtleSkge1xuICB0cnkge1xuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cbn1cblxyXG5mdW5jdGlvbiBwYXJzZUJvb2wodmFsdWUpIHtcclxuICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIHJldHVybiBub3JtYWxpemVkID09PSBcIjFcIiB8fCBub3JtYWxpemVkID09PSBcInRydWVcIiB8fCBub3JtYWxpemVkID09PSBcInllc1wiO1xyXG59XHJcblxyXG4vLyBQYXJzZXMgb3B0aW9uYWwgYm9vbGVhbiB2YWx1ZXMgd2l0aCBhIGRlZmF1bHQgZmFsbGJhY2suXHJcbmZ1bmN0aW9uIHBhcnNlT3B0aW9uYWxCb29sKHZhbHVlLCBmYWxsYmFjaykge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbGxiYWNrO1xyXG4gIHJldHVybiBwYXJzZUJvb2wobm9ybWFsaXplZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFF1ZXJ5UGFyYW0oa2V5KSB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBcIlwiO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoIHx8IFwiXCIpLmdldChrZXkpIHx8IFwiXCI7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZUVkaXRNb2RlS2V5KHZhbHVlKSB7XHJcbiAgY29uc3Qga2V5ID0gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIWtleSkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIGtleS5zdGFydHNXaXRoKFwiaW5kX3Zpc2l0X2VkaXRfXCIpID8ga2V5IDogXCJcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gSW5kVGV4dEVkaXRvckFwcCh7IGZpZWxkSWQsIGZpZWxkTGFiZWwsIGluaXRpYWxWYWx1ZSwgcmV0dXJuVXJsLCBpbml0aWFsUmVhZE9ubHkgPSBmYWxzZSwgZWRpdE1vZGVLZXkgPSBcIlwiLCBhbGxvd0VkaXQgPSB0cnVlIH0pIHtcbiAgY29uc3Qgc3RvcmFnZUtleSA9IHVzZU1lbW8oKCkgPT4gYCR7U1RPUkFHRV9QUkVGSVh9JHtTdHJpbmcoZmllbGRJZCB8fCBcIlwiKS50cmltKCl9YCwgW2ZpZWxkSWRdKTtcbiAgLy8gUmVzb2x2ZSByZXR1cm4gVVJMIGZyb20gcHJvcHMgb3Igc2Vzc2lvblN0b3JhZ2UuXHJcbiAgY29uc3QgcmVzb2x2ZWRSZXR1cm5VcmwgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGRpcmVjdCA9IHR5cGVvZiByZXR1cm5VcmwgPT09IFwic3RyaW5nXCIgPyByZXR1cm5VcmwudHJpbSgpIDogXCJcIjtcclxuICAgIGlmIChkaXJlY3QpIHJldHVybiBkaXJlY3Q7XHJcbiAgICBjb25zdCBzYWZlSWQgPSBTdHJpbmcoZmllbGRJZCB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBpZiAoIXNhZmVJZCkgcmV0dXJuIFwiXCI7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBzdG9yZWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGAke1NUT1JBR0VfUFJFRklYfSR7c2FmZUlkfV9yZXR1cm5VcmxgKTtcclxuICAgICAgcmV0dXJuIHN0b3JlZCA/IFN0cmluZyhzdG9yZWQpLnRyaW0oKSA6IFwiXCI7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgfSwgW2ZpZWxkSWQsIHJldHVyblVybF0pO1xyXG4gIGNvbnN0IGNhbkVkaXQgPSAhIWFsbG93RWRpdDtcclxuICBjb25zdCBbaXNSZWFkT25seSwgc2V0SXNSZWFkT25seV0gPSB1c2VTdGF0ZSghIWluaXRpYWxSZWFkT25seSB8fCAhY2FuRWRpdCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRFZGl0TW9kZUtleSA9IHVzZU1lbW8oKCkgPT4gbm9ybWFsaXplRWRpdE1vZGVLZXkoZWRpdE1vZGVLZXkpLCBbZWRpdE1vZGVLZXldKTtcbiAgY29uc3QgW3JlY29yZGVyT3Blbiwgc2V0UmVjb3JkZXJPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcmVjb3JkZXJSZXNldEtleSwgc2V0UmVjb3JkZXJSZXNldEtleV0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbcmVjb3JkZXJIZWlnaHRQeCwgc2V0UmVjb3JkZXJIZWlnaHRQeF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbaXNUcmFuc2NyaWJpbmcsIHNldElzVHJhbnNjcmliaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbdHJhbnNjcmliZUVycm9yLCBzZXRUcmFuc2NyaWJlRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2lzVHlwaW5nLCBzZXRJc1R5cGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgcmVjb3JkZXJCb3hSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgdHlwaW5nVGltZXJSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHR5cGluZ1RleHRSZWYgPSB1c2VSZWYoXCJcIik7XG4gIGNvbnN0IHR5cGluZ0luZGV4UmVmID0gdXNlUmVmKDApO1xuICBjb25zdCBpbml0aWFsVGV4dFJlZiA9IHVzZVJlZihcIlwiKTtcbiAgY29uc3QgdGV4dGFyZWFSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGNvbXB1dGVFZGl0b3JIZWlnaHQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICBjb25zdCBmYWxsYmFjayA9IGBjYWxjKDEwMHZoIC0gJHtUT1BCQVJfSEVJR0hUICsgT1VURVJfTUFSR0lOICogMn1weClgO1xyXG4gICAgICByZXR1cm4gZmFsbGJhY2s7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2aWV3cG9ydCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCAwO1xyXG4gICAgaWYgKCF2aWV3cG9ydCkge1xyXG4gICAgICByZXR1cm4gYGNhbGMoMTAwdmggLSAke1RPUEJBUl9IRUlHSFQgKyBPVVRFUl9NQVJHSU4gKiAyfXB4KWA7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZWNvcmRlclNwYWNlID0gcmVjb3JkZXJPcGVuID8gcmVjb3JkZXJIZWlnaHRQeCArIFJFQ09SREVSX0dBUCA6IDA7XHJcbiAgICBjb25zdCBhdmFpbGFibGUgPSBNYXRoLm1heCh2aWV3cG9ydCAtIFRPUEJBUl9IRUlHSFQgLSBPVVRFUl9NQVJHSU4gKiAyIC0gcmVjb3JkZXJTcGFjZSwgTUlOX0VESVRPUl9IRUlHSFQpO1xyXG4gICAgcmV0dXJuIGAke2F2YWlsYWJsZX1weGA7XHJcbiAgfSwgW3JlY29yZGVyT3BlbiwgcmVjb3JkZXJIZWlnaHRQeF0pO1xyXG5cclxuICBjb25zdCBbZWRpdG9ySGVpZ2h0LCBzZXRFZGl0b3JIZWlnaHRdID0gdXNlU3RhdGUoKCkgPT4gY29tcHV0ZUVkaXRvckhlaWdodCgpKTtcclxuXHJcbiAgY29uc3QgW3RleHQsIHNldFRleHRdID0gdXNlU3RhdGUoKCkgPT4ge1xuICAgIGNvbnN0IHN0b3JlZCA9IHNhZmVHZXRTZXNzaW9uVmFsdWUoc3RvcmFnZUtleSk7XG4gICAgY29uc3QgaW5pdGlhbFRleHQgPSBzdG9yZWQgIT09IG51bGwgPyBzdG9yZWQgOiBTdHJpbmcoaW5pdGlhbFZhbHVlIHx8IFwiXCIpO1xuICAgIGluaXRpYWxUZXh0UmVmLmN1cnJlbnQgPSBpbml0aWFsVGV4dDtcbiAgICByZXR1cm4gaW5pdGlhbFRleHQ7XG4gIH0pO1xuXHJcbiAgY29uc3Qgc3RvcFR5cGluZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICh0eXBpbmdUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0eXBpbmdUaW1lclJlZi5jdXJyZW50KTtcclxuICAgICAgdHlwaW5nVGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICB0eXBpbmdUZXh0UmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgdHlwaW5nSW5kZXhSZWYuY3VycmVudCA9IDA7XHJcbiAgICBzZXRJc1R5cGluZyhmYWxzZSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBzdGFydFR5cGluZyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGZ1bGxUZXh0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRleHRWYWx1ZSA9IFN0cmluZyhmdWxsVGV4dCB8fCBcIlwiKTtcclxuICAgICAgc3RvcFR5cGluZygpO1xyXG4gICAgICBpZiAoIXRleHRWYWx1ZSkge1xyXG4gICAgICAgIHNldFRleHQoXCJcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0eXBpbmdUZXh0UmVmLmN1cnJlbnQgPSB0ZXh0VmFsdWU7XHJcbiAgICAgIHR5cGluZ0luZGV4UmVmLmN1cnJlbnQgPSAwO1xyXG4gICAgICBzZXRJc1R5cGluZyh0cnVlKTtcclxuICAgICAgc2V0VGV4dChcIlwiKTtcclxuXHJcbiAgICAgIGNvbnN0IHRvdGFsID0gdGV4dFZhbHVlLmxlbmd0aDtcclxuICAgICAgY29uc3QgbWF4U3RlcHMgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKFRZUEVfVEFSR0VUX01TIC8gVFlQRV9JTlRFUlZBTF9NUykpO1xyXG4gICAgICBjb25zdCBzdGVwU2l6ZSA9IE1hdGgubWluKFRZUEVfTUFYX1NURVAsIE1hdGgubWF4KFRZUEVfTUlOX1NURVAsIE1hdGguY2VpbCh0b3RhbCAvIG1heFN0ZXBzKSkpO1xyXG5cclxuICAgICAgY29uc3QgdGljayA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0ID0gTWF0aC5taW4odHlwaW5nSW5kZXhSZWYuY3VycmVudCArIHN0ZXBTaXplLCB0b3RhbCk7XHJcbiAgICAgICAgdHlwaW5nSW5kZXhSZWYuY3VycmVudCA9IG5leHQ7XHJcbiAgICAgICAgc2V0VGV4dCh0eXBpbmdUZXh0UmVmLmN1cnJlbnQuc2xpY2UoMCwgbmV4dCkpO1xyXG4gICAgICAgIGlmIChuZXh0IDwgdG90YWwpIHtcclxuICAgICAgICAgIHR5cGluZ1RpbWVyUmVmLmN1cnJlbnQgPSBzZXRUaW1lb3V0KHRpY2ssIFRZUEVfSU5URVJWQUxfTVMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0eXBpbmdUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICAgIHNldElzVHlwaW5nKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0eXBpbmdUaW1lclJlZi5jdXJyZW50ID0gc2V0VGltZW91dCh0aWNrLCBUWVBFX0lOVEVSVkFMX01TKTtcclxuICAgIH0sXHJcbiAgICBbc3RvcFR5cGluZ11cclxuICApO1xyXG5cclxuICAvLyBTZW5kIHRoZSBXQVYgdG8gTVZDIGFuZCByZXBsYWNlIHRleHRhcmVhIHdpdGggdGhlIHRyYW5zY3JpcHRpb24uXHJcbiAgY29uc3QgaGFuZGxlVHJhbnNjcmliZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKHdhdkJsb2IpID0+IHtcclxuICAgICAgaWYgKCF3YXZCbG9iIHx8IGlzVHJhbnNjcmliaW5nKSByZXR1cm47XHJcblxyXG4gICAgICAvLyBMb2NrIHRoZSBlZGl0b3Igd2hpbGUgdGhlIHRyYW5zY3JpcHRpb24gcmVxdWVzdCBpcyBpbiBmbGlnaHQuXHJcbiAgICAgIHNldElzVHJhbnNjcmliaW5nKHRydWUpO1xyXG4gICAgICBzZXRUcmFuc2NyaWJlRXJyb3IoXCJcIik7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIC8vIEJ1aWxkIG11bHRpcGFydCBmb3JtIHBheWxvYWQgZXhwZWN0ZWQgYnkgL1Zpc2l0YXMvVHJhbnNjcmliZVNwZWVjaC5cclxuICAgICAgICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZm9ybS5hcHBlbmQoXCJsYW5ndWFnZUlkXCIsIFwiYXV0b1wiKTtcclxuICAgICAgICBmb3JtLmFwcGVuZChcImF1ZGlvRmlsZVwiLCB3YXZCbG9iLCBcImF1ZGlvLndhdlwiKTtcclxuICAgICAgICBpZiAocmVzb2x2ZWRSZXR1cm5VcmwpIHtcclxuICAgICAgICAgIGZvcm0uYXBwZW5kKFwicmV0dXJuVXJsXCIsIHJlc29sdmVkUmV0dXJuVXJsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNzcmZUb2tlbiA9IGdldENzcmZUb2tlbigpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7XHJcbiAgICAgICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgXCJYLVJlcXVlc3RlZC1XaXRoXCI6IFwiWE1MSHR0cFJlcXVlc3RcIixcclxuICAgICAgICAgIC4uLihjc3JmVG9rZW4gPyB7IFJlcXVlc3RWZXJpZmljYXRpb25Ub2tlbjogY3NyZlRva2VuIH0gOiB7fSksXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2VuZCB0aGUgV0FWIHRvIE1WQyAoc2VydmVyIHdpbGwgY2FsbCB0aGUgc3BlZWNoIEFQSSkuXHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSByZXNvbHZlZFJldHVyblVybCA/IGA/cmV0dXJuVXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHJlc29sdmVkUmV0dXJuVXJsKX1gIDogXCJcIjtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvVmlzaXRhcy9UcmFuc2NyaWJlU3BlZWNoJHtxdWVyeX1gLCB7XHJcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgYm9keTogZm9ybSxcclxuICAgICAgICAgIGhlYWRlcnMsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gbnVsbCk7XHJcbiAgICAgICAgY29uc3Qgb2sgPSByZXNwb25zZS5vayAmJiBwYXlsb2FkICYmIHBheWxvYWQuc3VjY2VzcyA9PT0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKCFvaykge1xyXG4gICAgICAgICAgY29uc3QgbXNnID0gcGF5bG9hZCAmJiBwYXlsb2FkLm1lc3NhZ2UgPyBTdHJpbmcocGF5bG9hZC5tZXNzYWdlKSA6IGluZFQoXCJUZXh0RWRpdG9yX1RyYW5zY3JpYmVGYWlsZWRcIiwgXCJUcmFuc2NyaWJlIGZhaWxlZC5cIik7XHJcbiAgICAgICAgICBzZXRUcmFuc2NyaWJlRXJyb3IobXNnKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRyYW5zY3JpcHQgPSBwYXlsb2FkICYmIHR5cGVvZiBwYXlsb2FkLmRhdGEgPT09IFwic3RyaW5nXCIgPyBwYXlsb2FkLmRhdGEgOiBcIlwiO1xyXG4gICAgICAgIGlmICghdHJhbnNjcmlwdC50cmltKCkpIHtcclxuICAgICAgICAgIHNldFRyYW5zY3JpYmVFcnJvcihpbmRUKFwiVGV4dEVkaXRvcl9UcmFuc2NyaWJlRmFpbGVkXCIsIFwiVHJhbnNjcmliZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlcGxhY2UgdGhlIGZ1bGwgdGV4dGFyZWEgY29udGVudCB3aXRoIHRoZSBuZXcgdHJhbnNjcmlwdGlvbi5cclxuICAgICAgICBzdGFydFR5cGluZyh0cmFuc2NyaXB0KTtcclxuICAgICAgICAvLyBIaWRlIHRoZSByZWNvcmRlciBhZnRlciBhIHN1Y2Nlc3NmdWwgdHJhbnNjcmlwdGlvbi5cclxuICAgICAgICBzZXRSZWNvcmRlck9wZW4oZmFsc2UpO1xyXG4gICAgICAgIHNldFJlY29yZGVyUmVzZXRLZXkoKGspID0+IGsgKyAxKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc3QgbXNnID0gZXJyICYmIGVyci5tZXNzYWdlID8gU3RyaW5nKGVyci5tZXNzYWdlKSA6IGluZFQoXCJUZXh0RWRpdG9yX1RyYW5zY3JpYmVGYWlsZWRcIiwgXCJUcmFuc2NyaWJlIGZhaWxlZC5cIik7XHJcbiAgICAgICAgc2V0VHJhbnNjcmliZUVycm9yKG1zZyk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgLy8gUmUtZW5hYmxlIHRoZSBlZGl0b3IgYWZ0ZXIgY29tcGxldGlvbi5cclxuICAgICAgICBzZXRJc1RyYW5zY3JpYmluZyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbaXNUcmFuc2NyaWJpbmcsIHN0YXJ0VHlwaW5nXVxyXG4gICk7XHJcblxyXG4gIC8vIENsZWFyIHRyYW5zY3JpcHRpb24gZXJyb3JzIHdoZW4gYXVkaW8gY2hhbmdlcy5cclxuICBjb25zdCBoYW5kbGVBdWRpb0NsZWFyZWQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0VHJhbnNjcmliZUVycm9yKFwiXCIpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlUmVjb3JkaW5nRXJyb3IgPSB1c2VDYWxsYmFjaygobWVzc2FnZSkgPT4ge1xuICAgIC8vIFNob3cgYSB3YXJuaW5nIGFjdGlvbiBtYXJrOyBrZWVwIHRoZSByZWNvcmRlciBvcGVuIHRvIGRpc3BsYXkgdGhlIGVycm9yIGxhYmVsLlxuICAgIHRyeSB7XG4gICAgICBpZiAod2luZG93LklORCAmJiB0eXBlb2Ygd2luZG93LklORC5mbGFzaEFjdGlvbk1hcmsgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB3aW5kb3cuSU5ELmZsYXNoQWN0aW9uTWFyayh7IHR5cGU6IFwid2FybmluZ1Byb2Nlc3NcIiwgZHVyYXRpb25NczogMTUwMCB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIGlnbm9yZVxuICAgIH1cbiAgfSwgW10pO1xuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgdXBkYXRlSGVpZ2h0ID0gKCkgPT4ge1xyXG4gICAgICBzZXRFZGl0b3JIZWlnaHQoY29tcHV0ZUVkaXRvckhlaWdodCgpKTtcclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlSGVpZ2h0KCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVIZWlnaHQpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCB1cGRhdGVIZWlnaHQpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlSGVpZ2h0KTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCB1cGRhdGVIZWlnaHQpO1xyXG4gICAgfTtcclxuICB9LCBbY29tcHV0ZUVkaXRvckhlaWdodF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICBpZiAoIXJlY29yZGVyT3Blbikge1xyXG4gICAgICBzZXRSZWNvcmRlckhlaWdodFB4KDApO1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVsID0gcmVjb3JkZXJCb3hSZWYuY3VycmVudDtcclxuICAgIGlmICghZWwpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3QgbWVhc3VyZSA9ICgpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgc2V0UmVjb3JkZXJIZWlnaHRQeChNYXRoLm1heCgwLCBNYXRoLmZsb29yKHJlY3QuaGVpZ2h0KSkpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICAvKiBpZ25vcmUgKi9cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBtZWFzdXJlKCk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBSZXNpemVPYnNlcnZlciAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICBjb25zdCBybyA9IG5ldyBSZXNpemVPYnNlcnZlcihtZWFzdXJlKTtcclxuICAgICAgcm8ub2JzZXJ2ZShlbCk7XHJcbiAgICAgIHJldHVybiAoKSA9PiByby5kaXNjb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgbWVhc3VyZSk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgbWVhc3VyZSk7XHJcbiAgfSwgW3JlY29yZGVyT3Blbl0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4gc3RvcFR5cGluZywgW3N0b3BUeXBpbmddKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNUeXBpbmcpIHJldHVybjtcclxuICAgIGNvbnN0IGVsID0gdGV4dGFyZWFSZWYuY3VycmVudDtcclxuICAgIGlmICghZWwpIHJldHVybjtcclxuICAgIGVsLnNjcm9sbFRvcCA9IGVsLnNjcm9sbEhlaWdodDtcclxuICB9LCBbaXNUeXBpbmcsIHRleHRdKTtcclxuXHJcbiAgY29uc3QgdG9nZ2xlUmVjb3JkZXIgPSAoKSA9PiB7XHJcbiAgICBpZiAoaXNSZWFkT25seSB8fCBpc1RyYW5zY3JpYmluZyB8fCBpc1R5cGluZykgcmV0dXJuO1xyXG4gICAgc2V0VHJhbnNjcmliZUVycm9yKFwiXCIpO1xyXG4gICAgc2V0UmVjb3JkZXJPcGVuKChvcGVuKSA9PiB7XHJcbiAgICAgIGlmIChvcGVuKSBzZXRSZWNvcmRlclJlc2V0S2V5KChrKSA9PiBrICsgMSk7XHJcbiAgICAgIHJldHVybiAhb3BlbjtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGFsbG93SGlzdG9yeU5hdiA9ICgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5fX2luZEFsbG93SGlzdG9yeU9uY2UgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICB3aW5kb3cuX19pbmRBbGxvd0hpc3RvcnlPbmNlKCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWNhbkVkaXQgfHwgIWlzUmVhZE9ubHkpIHJldHVybjtcclxuICAgIHNldElzUmVhZE9ubHkoZmFsc2UpO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWRFZGl0TW9kZUtleSkgc2FmZVNldFNlc3Npb25WYWx1ZShub3JtYWxpemVkRWRpdE1vZGVLZXksIFwidHJ1ZVwiKTtcclxuICB9LCBbY2FuRWRpdCwgaXNSZWFkT25seSwgbm9ybWFsaXplZEVkaXRNb2RlS2V5XSk7XHJcblxyXG4gIGNvbnN0IHBlcnNpc3REcmFmdCA9ICgpID0+IHtcclxuICAgIC8vIFBlcnNpc3QgdGhlIGRyYWZ0IHNvIHRoZSBwcmV2aW91cyBwYWdlIGNhbiByZXN0b3JlIGl0LlxyXG4gICAgc2FmZVNldFNlc3Npb25WYWx1ZShzdG9yYWdlS2V5LCB0ZXh0KTtcclxuICB9O1xyXG5cclxuICBjb25zdCBnb0JhY2sgPSAoKSA9PiB7XHJcbiAgICBwZXJzaXN0RHJhZnQoKTtcclxuICAgIGlmIChyZXNvbHZlZFJldHVyblVybCkge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc29sdmVkUmV0dXJuVXJsO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAod2luZG93Lmhpc3RvcnkubGVuZ3RoID4gMSAmJiBhbGxvd0hpc3RvcnlOYXYoKSkgcmV0dXJuO1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdvQmFja0FmdGVyU2F2ZSA9ICgpID0+IHtcclxuICAgIC8vIFByZWZlciByZXR1cm5VcmwgZm9yIGRldGVybWluaXN0aWMgbmF2aWdhdGlvbiBhY3Jvc3MgYnJvd3NlcnMuXHJcbiAgICBpZiAocmVzb2x2ZWRSZXR1cm5VcmwpIHtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNvbHZlZFJldHVyblVybDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHdpbmRvdy5oaXN0b3J5Lmxlbmd0aCA+IDEgJiYgYWxsb3dIaXN0b3J5TmF2KCkpIHJldHVybjtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBvblNhdmUgPSAoKSA9PiB7XG4gICAgaWYgKGlzUmVhZE9ubHkgfHwgaXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmcpIHJldHVybjtcbiAgICBzYWZlU2V0U2Vzc2lvblZhbHVlKHN0b3JhZ2VLZXksIHRleHQpO1xuICAgIGlmIChub3JtYWxpemVkRWRpdE1vZGVLZXkpIHtcbiAgICAgIHNhZmVTZXRTZXNzaW9uVmFsdWUobm9ybWFsaXplZEVkaXRNb2RlS2V5LCBcInRydWVcIik7XG4gICAgICBzYWZlU2V0U2Vzc2lvblZhbHVlKGAke25vcm1hbGl6ZWRFZGl0TW9kZUtleX1fcmV0dXJuYCwgXCIxXCIpO1xuICAgIH1cbiAgICBnb0JhY2tBZnRlclNhdmUoKTtcbiAgfTtcblxuICAvLyBSZXN0b3JlIHRoZSBpbml0aWFsIHRleHQgdmFsdWUgZm9yIHRoaXMgc2Vzc2lvbiB3aXRob3V0IHNhdmluZy5cbiAgY29uc3Qgb25DYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChpc1JlYWRPbmx5IHx8IGlzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nKSByZXR1cm47XG4gICAgc3RvcFR5cGluZygpO1xuICAgIHNldFRyYW5zY3JpYmVFcnJvcihcIlwiKTtcbiAgICBjb25zdCBpbml0aWFsVGV4dCA9IGluaXRpYWxUZXh0UmVmLmN1cnJlbnQgPz8gXCJcIjtcbiAgICBzZXRUZXh0KGluaXRpYWxUZXh0KTtcbiAgICBzYWZlU2V0U2Vzc2lvblZhbHVlKHN0b3JhZ2VLZXksIGluaXRpYWxUZXh0KTtcbiAgICBpZiAobm9ybWFsaXplZEVkaXRNb2RlS2V5KSB7XG4gICAgICBzYWZlUmVtb3ZlU2Vzc2lvblZhbHVlKGAke25vcm1hbGl6ZWRFZGl0TW9kZUtleX1fcmV0dXJuYCk7XG4gICAgICBzYWZlUmVtb3ZlU2Vzc2lvblZhbHVlKG5vcm1hbGl6ZWRFZGl0TW9kZUtleSk7XG4gICAgfVxuICAgIGdvQmFja0FmdGVyU2F2ZSgpO1xuICB9LCBbaXNSZWFkT25seSwgaXNUcmFuc2NyaWJpbmcsIGlzVHlwaW5nLCBzdG9wVHlwaW5nLCBzdG9yYWdlS2V5LCBnb0JhY2tBZnRlclNhdmUsIG5vcm1hbGl6ZWRFZGl0TW9kZUtleV0pO1xuXHJcbiAgY29uc3QgZWRpdG9yQm94Q2xhc3MgPSBpc1JlYWRPbmx5XG4gICAgPyBcInJlbGF0aXZlIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXNsYXRlLTEwMCBzaGFkb3ctbGcgb3ZlcmZsb3ctaGlkZGVuIGZvY3VzLXdpdGhpbjpyaW5nLTQgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeS80MCBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnlcIlxuICAgIDogXCJyZWxhdGl2ZSByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCBiZy13aGl0ZSBzaGFkb3ctbGcgb3ZlcmZsb3ctaGlkZGVuIGZvY3VzLXdpdGhpbjpyaW5nLTQgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeS80MCBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnlcIjtcbiAgY29uc3QgbWljRGlzYWJsZWQgPSBpc1JlYWRPbmx5IHx8IGlzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nO1xuICBjb25zdCBtaWNCdXR0b25DbGFzcyA9IGBhYnNvbHV0ZSB0b3AtMCByaWdodC0wIHotMjAgaW5saW5lLWZsZXggaC1bNzBweF0gdy1bNzBweF0gaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG92ZXJmbG93LXZpc2libGUgYmctdHJhbnNwYXJlbnQgcC0wIG0tMCBib3JkZXItMCByb3VuZGVkLW5vbmUgdGV4dC1wcmltYXJ5IHNoYWRvdy1ub25lIGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMCBmb2N1czpyaW5nLW9mZnNldC0wJHtcbiAgICBtaWNEaXNhYmxlZCA/IFwiIG9wYWNpdHktNzAgY3Vyc29yLW5vdC1hbGxvd2VkXCIgOiBcIiBob3Zlcjp0ZXh0LXByaW1hcnkvODBcIlxuICB9YDtcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBoLWR2aCB3LWZ1bGwgZmxleCBmbGV4LWNvbCBiZy1zbGF0ZS0yMDBcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BiYXIgc2hhZG93LW1kXCI+XHJcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGNsYXNzTmFtZT1cInRvcGJhci1idG5cIlxuICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJUb3BiYXJfQmFja1wiLCBcIkJhY2tcIil9XG4gICAgICAgICAgb25DbGljaz17Z29CYWNrfVxuICAgICAgICA+XG4gICAgICAgICAgPENoZXZyb25MZWZ0SWNvbiBjbGFzc05hbWU9XCJoLTYgdy02XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgPC9idXR0b24+XG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcGJhci1jZW50ZXIgZmxleC0xIGZsZXgganVzdGlmeS1jZW50ZXIgcG9pbnRlci1ldmVudHMtbm9uZSBweC0yXCI+XHJcbiAgICAgICAgICA8c3BhbiBpZD1cInRvcGJhclRpdGxlXCIgY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj5cclxuICAgICAgICAgICAge2ZpZWxkTGFiZWx9XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHtpc1JlYWRPbmx5ID8gKFxyXG4gICAgICAgICAgY2FuRWRpdCA/IChcclxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidG9wYmFyLWJ0blwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fRWRpdFwiLCBcIkVkaXRcIil9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2VuYWJsZUVkaXR9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzTmFtZT1cImgtNiB3LTZcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE2Ljg2MiA0LjQ4NyAxLjY4Ny0xLjY4OGExLjg3NSAxLjg3NSAwIDEgMSAyLjY1MiAyLjY1Mkw2LjgzMiAxOS44MmE0LjUgNC41IDAgMCAxLTEuODk3IDEuMTNsLTIuNjg1LjguOC0yLjY4NWE0LjUgNC41IDAgMCAxIDEuMTMtMS44OTdMMTYuODYzIDQuNDg3Wm0wIDBMMTkuNSA3LjEyNVwiIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXYgYXJpYS1oaWRkZW49XCJ0cnVlXCIgc3R5bGU9e3sgd2lkdGg6IFwiMjVweFwiLCBoZWlnaHQ6IFwiMjVweFwiIH19IC8+XG4gICAgICAgICAgKVxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLVsxNHB4XSBwci0xXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0b3BiYXItYnRuXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKX1cbiAgICAgICAgICAgICAgb25DbGljaz17b25TYXZlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNiB3LTZcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm00LjUgMTIuNzUgNiA2IDktMTMuNVwiIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0b3BiYXItYnRuXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIil9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2FuY2VsRWRpdH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTYgdy02XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNNiAxOCAxOCA2TTYgNmwxMiAxMlwiIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBtaW4taC0wIHctZnVsbCBweC00IHBiLTQgcHQtM1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LTN4bCBteC1hdXRvXCIgc3R5bGU9e3sgbWFyZ2luVG9wOiBgJHtPVVRFUl9NQVJHSU59cHhgLCBtYXJnaW5Cb3R0b206IGAke09VVEVSX01BUkdJTn1weGAgfX0+XHJcbiAgICAgICAgICB7cmVjb3JkZXJPcGVuICYmIChcclxuICAgICAgICAgICAgPGRpdiByZWY9e3JlY29yZGVyQm94UmVmfSBjbGFzc05hbWU9XCJtYi0zIHctZnVsbFwiPlxyXG4gICAgICAgICAgICAgIDxBdWRpb1JlY29yZGVyTWluaW1hbFxuICAgICAgICAgICAgICAgIGtleT17cmVjb3JkZXJSZXNldEtleX1cbiAgICAgICAgICAgICAgICBlbWJlZGRlZFxuICAgICAgICAgICAgICAgIG9uVHJhbnNjcmliZT17aGFuZGxlVHJhbnNjcmliZX1cbiAgICAgICAgICAgICAgICB0cmFuc2NyaWJlQnVzeT17aXNUcmFuc2NyaWJpbmd9XG4gICAgICAgICAgICAgICAgdHJhbnNjcmliZUxhYmVsPXtpbmRUKFwiVGV4dEVkaXRvcl9UcmFuc2NyaWJlXCIsIFwiVHJhbnNjcmliZVwiKX1cbiAgICAgICAgICAgICAgICB0cmFuc2NyaWJlQnVzeUxhYmVsPXtpbmRUKFwiVGV4dEVkaXRvcl9UcmFuc2NyaWJpbmdcIiwgXCJUcmFuc2NyaWJpbmdcIil9XG4gICAgICAgICAgICAgICAgb25BdWRpb0NsZWFyZWQ9e2hhbmRsZUF1ZGlvQ2xlYXJlZH1cbiAgICAgICAgICAgICAgICBvblJlY29yZGluZ0Vycm9yPXtoYW5kbGVSZWNvcmRpbmdFcnJvcn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cclxuICAgICAgICAgIHt0cmFuc2NyaWJlRXJyb3IgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItMyB0ZXh0LXhzIHRleHQtcm9zZS03MDAgdGV4dC1jZW50ZXJcIj57dHJhbnNjcmliZUVycm9yfTwvZGl2PlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2VkaXRvckJveENsYXNzfT5cclxuICAgICAgICAgICAgPHRleHRhcmVhXHJcbiAgICAgICAgICAgICAgcmVmPXt0ZXh0YXJlYVJlZn1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgcmVzaXplLW5vbmUgYmctdHJhbnNwYXJlbnQgcHgtNSBwYi01IHB0LTEwIHByLTE0IGZvY3VzOm91dGxpbmUtaGlkZGVuICR7aXNSZWFkT25seSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcInRleHQtc2xhdGUtOTAwXCJ9YH1cbiAgICAgICAgICAgICAgdmFsdWU9e3RleHR9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRUZXh0KGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmd9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHk9e2lzUmVhZE9ubHkgfHwgaXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmd9XHJcbiAgICAgICAgICAgICAgYXJpYS1yZWFkb25seT17aXNSZWFkT25seSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgIGFyaWEtYnVzeT17aXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmd9XHJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgaGVpZ2h0OiBlZGl0b3JIZWlnaHQgfX1cclxuICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgIHtpc1RyYW5zY3JpYmluZyA/IChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei0yMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS0yMDAvODBcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cclxuICAgICAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtMTYgdy0xNlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNyLW9ubHlcIj57aW5kVChcIlRleHRFZGl0b3JfVHJhbnNjcmliaW5nXCIsIFwiVHJhbnNjcmliaW5nXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17bWljQnV0dG9uQ2xhc3N9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiVGV4dEVkaXRvcl9NaWNyb3Bob25lXCIsIFwiTWljcm9waG9uZVwiKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RvZ2dsZVJlY29yZGVyfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e21pY0Rpc2FibGVkfVxuICAgICAgICAgICAgYXJpYS1kaXNhYmxlZD17bWljRGlzYWJsZWQgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwb2ludGVyLWV2ZW50cy1ub25lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICA8UHVsc2VSaW5nc011bHRpcGxlSWNvbiBzaXplPXsyNDB9IHBhZGRpbmc9ezEyfSBjb2xvcj1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsyfSBvcGFjaXR5PXswLjN9IHJvdGF0aW9uPXs5MH0gLz5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezF9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNiB3LTYgcmVsYXRpdmUgei0xMFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTIgMTguNzVhNiA2IDAgMCAwIDYtNnYtMS41bS02IDcuNWE2IDYgMCAwIDEtNi02di0xLjVtNiA3LjV2My43NW0tMy43NSAwaDcuNU0xMiAxNS43NWEzIDMgMCAwIDEtMy0zVjQuNWEzIDMgMCAxIDEgNiAwdjguMjVhMyAzIDAgMCAxLTMgM1pcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIE1vdW50IHRoZSB0ZXh0IGVkaXRvciBpbnRvIHRoZSBSYXpvciB2aWV3LlxyXG5leHBvcnQgY29uc3QgbW91bnRUZXh0RWRpdG9yID0gKCkgPT4ge1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZC10ZXh0LWVkaXRvci1yb290XCIpIGFzIEluZFJvb3RFbGVtZW50IHwgbnVsbDtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcblxyXG4gIGNvbnN0IGZpZWxkSWQgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1maWVsZC1pZFwiKSB8fCBcIlwiO1xyXG4gIGNvbnN0IGZpZWxkTGFiZWwgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1maWVsZC1sYWJlbFwiKSB8fCBcIlwiO1xyXG4gIGNvbnN0IGluaXRpYWxWYWx1ZSA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZpZWxkLXZhbHVlXCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgcmV0dXJuVXJsID0gcm9vdEVsLmdldEF0dHJpYnV0ZShcImRhdGEtcmV0dXJuLXVybFwiKSB8fCBcIlwiO1xyXG4gIGNvbnN0IHJlYWRPbmx5QXR0ciA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXJlYWQtb25seVwiKSB8fCBcIlwiO1xyXG4gIGNvbnN0IGluaXRpYWxSZWFkT25seSA9XHJcbiAgICBwYXJzZUJvb2wocmVhZE9ubHlBdHRyKSB8fCBwYXJzZUJvb2woZ2V0UXVlcnlQYXJhbShcInJlYWRPbmx5XCIpKSB8fCBwYXJzZUJvb2woZ2V0UXVlcnlQYXJhbShcInJlYWRvbmx5XCIpKTtcclxuICBjb25zdCBhbGxvd0VkaXRBdHRyID0gcm9vdEVsLmdldEF0dHJpYnV0ZShcImRhdGEtYWxsb3ctZWRpdFwiKSB8fCBcIlwiO1xyXG4gIGNvbnN0IGFsbG93RWRpdFF1ZXJ5ID0gZ2V0UXVlcnlQYXJhbShcImFsbG93RWRpdFwiKSB8fCBnZXRRdWVyeVBhcmFtKFwiY2FuRWRpdFwiKTtcclxuICBjb25zdCBhbGxvd0VkaXQgPSBwYXJzZU9wdGlvbmFsQm9vbChhbGxvd0VkaXRRdWVyeSwgcGFyc2VPcHRpb25hbEJvb2woYWxsb3dFZGl0QXR0ciwgdHJ1ZSkpO1xyXG4gIGNvbnN0IGVkaXRNb2RlS2V5QXR0ciA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWVkaXQtbW9kZS1rZXlcIikgfHwgXCJcIjtcclxuICBjb25zdCBlZGl0TW9kZUtleSA9IGVkaXRNb2RlS2V5QXR0ciB8fCBnZXRRdWVyeVBhcmFtKFwiZWRpdE1vZGVLZXlcIikgfHwgXCJcIjtcclxuXHJcbiAgY29uc3QgZXhpc3RpbmcgPSByb290RWwuX19pbmRSb290O1xuICBjb25zdCBlbGVtZW50ID0gKFxuICAgIDxJbmRUZXh0RWRpdG9yQXBwXG4gICAgICBmaWVsZElkPXtmaWVsZElkfVxuICAgICAgZmllbGRMYWJlbD17ZmllbGRMYWJlbH1cbiAgICAgIGluaXRpYWxWYWx1ZT17aW5pdGlhbFZhbHVlfVxuICAgICAgcmV0dXJuVXJsPXtyZXR1cm5Vcmx9XG4gICAgICBpbml0aWFsUmVhZE9ubHk9e2luaXRpYWxSZWFkT25seX1cbiAgICAgIGVkaXRNb2RlS2V5PXtlZGl0TW9kZUtleX1cbiAgICAgIGFsbG93RWRpdD17YWxsb3dFZGl0fVxuICAgIC8+XG4gICk7XG5cbiAgaWYgKGV4aXN0aW5nKSB7XG4gICAgZXhpc3RpbmcucmVuZGVyKGVsZW1lbnQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJvb3QgPSBjcmVhdGVSb290KHJvb3RFbCk7XG4gIHJvb3RFbC5fX2luZFJvb3QgPSByb290O1xuICByb290LnJlbmRlcihlbGVtZW50KTtcbn07XG5cbi8vIEF1dG8tbW91bnQgd2hlbiB0aGUgcGFnZSBidW5kbGUgbG9hZHMuXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgbW91bnRUZXh0RWRpdG9yKCk7XG59O1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XG4gICAgbW91bnQoKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBtb3VudCk7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBJbmRUZXh0RWRpdG9yQXBwO1xuIiwgImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuZnVuY3Rpb24gQ2hldnJvbkxlZnRJY29uKHtcbiAgdGl0bGUsXG4gIHRpdGxlSWQsXG4gIC4uLnByb3BzXG59LCBzdmdSZWYpIHtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIE9iamVjdC5hc3NpZ24oe1xuICAgIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gICAgZmlsbDogXCJub25lXCIsXG4gICAgdmlld0JveDogXCIwIDAgMjQgMjRcIixcbiAgICBzdHJva2VXaWR0aDogMS41LFxuICAgIHN0cm9rZTogXCJjdXJyZW50Q29sb3JcIixcbiAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLFxuICAgIFwiZGF0YS1zbG90XCI6IFwiaWNvblwiLFxuICAgIHJlZjogc3ZnUmVmLFxuICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IHRpdGxlSWRcbiAgfSwgcHJvcHMpLCB0aXRsZSA/IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwidGl0bGVcIiwge1xuICAgIGlkOiB0aXRsZUlkXG4gIH0sIHRpdGxlKSA6IG51bGwsIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7XG4gICAgc3Ryb2tlTGluZWNhcDogXCJyb3VuZFwiLFxuICAgIHN0cm9rZUxpbmVqb2luOiBcInJvdW5kXCIsXG4gICAgZDogXCJNMTUuNzUgMTkuNSA4LjI1IDEybDcuNS03LjVcIlxuICB9KSk7XG59XG5jb25zdCBGb3J3YXJkUmVmID0gLyojX19QVVJFX18qLyBSZWFjdC5mb3J3YXJkUmVmKENoZXZyb25MZWZ0SWNvbik7XG5leHBvcnQgZGVmYXVsdCBGb3J3YXJkUmVmOyIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgUHVsc2VSaW5nc011bHRpcGxlSWNvblByb3BzID0ge1xuICBzaXplPzogbnVtYmVyIHwgc3RyaW5nO1xuICBjb2xvcj86IHN0cmluZztcbiAgc3Ryb2tlV2lkdGg/OiBudW1iZXI7XG4gIGJhY2tncm91bmQ/OiBzdHJpbmc7XG4gIG9wYWNpdHk/OiBudW1iZXI7XG4gIHJvdGF0aW9uPzogbnVtYmVyO1xuICBzaGFkb3c/OiBudW1iZXI7XG4gIGZsaXBIb3Jpem9udGFsPzogYm9vbGVhbjtcbiAgZmxpcFZlcnRpY2FsPzogYm9vbGVhbjtcbiAgcGFkZGluZz86IG51bWJlcjtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xufTtcblxuLy8gUHVsc2UgcmluZ3MgaWNvbiB3aXRoIENTUyBhbmltYXRpb24gdG8gYXZvaWQgU01JTCBjb21wYXRpYmlsaXR5IGlzc3Vlcy5cbmNvbnN0IFB1bHNlUmluZ3NNdWx0aXBsZUljb24gPSAoe1xuICBzaXplLFxuICBjb2xvciA9IFwiY3VycmVudENvbG9yXCIsXG4gIHN0cm9rZVdpZHRoID0gMixcbiAgYmFja2dyb3VuZCA9IFwidHJhbnNwYXJlbnRcIixcbiAgb3BhY2l0eSA9IDAuNCxcbiAgcm90YXRpb24gPSA5MCxcbiAgc2hhZG93ID0gMCxcbiAgZmxpcEhvcml6b250YWwgPSBmYWxzZSxcbiAgZmxpcFZlcnRpY2FsID0gZmFsc2UsXG4gIHBhZGRpbmcgPSAxMixcbiAgY2xhc3NOYW1lLFxufTogUHVsc2VSaW5nc011bHRpcGxlSWNvblByb3BzKSA9PiB7XG4gIGNvbnN0IHRyYW5zZm9ybXMgPSBbXTtcbiAgaWYgKHJvdGF0aW9uICE9PSAwKSB0cmFuc2Zvcm1zLnB1c2goYHJvdGF0ZSgke3JvdGF0aW9ufWRlZylgKTtcbiAgaWYgKGZsaXBIb3Jpem9udGFsKSB0cmFuc2Zvcm1zLnB1c2goXCJzY2FsZVgoLTEpXCIpO1xuICBpZiAoZmxpcFZlcnRpY2FsKSB0cmFuc2Zvcm1zLnB1c2goXCJzY2FsZVkoLTEpXCIpO1xuXG4gIGNvbnN0IHZpZXdCb3hTaXplID0gMjQgKyBwYWRkaW5nICogMjtcbiAgY29uc3Qgdmlld0JveE9mZnNldCA9IC1wYWRkaW5nO1xuICBjb25zdCB2aWV3Qm94ID0gYCR7dmlld0JveE9mZnNldH0gJHt2aWV3Qm94T2Zmc2V0fSAke3ZpZXdCb3hTaXplfSAke3ZpZXdCb3hTaXplfWA7XG4gIGNvbnN0IHJpbmdQYXRoID1cbiAgICBcIk0xMiwxQTExLDExLDAsMSwwLDIzLDEyLDExLDExLDAsMCwwLDEyLDFabTAsMjBhOSw5LDAsMSwxLDktOUE5LDksMCwwLDEsMTIsMjFaXCI7XG5cbiAgcmV0dXJuIChcbiAgICA8c3ZnXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgIHZpZXdCb3g9e3ZpZXdCb3h9XG4gICAgICB3aWR0aD17c2l6ZX1cbiAgICAgIGhlaWdodD17c2l6ZX1cbiAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgIHN0cm9rZT17Y29sb3J9XG4gICAgICBzdHJva2VXaWR0aD17c3Ryb2tlV2lkdGh9XG4gICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIG9wYWNpdHksXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3Jtcy5qb2luKFwiIFwiKSB8fCB1bmRlZmluZWQsXG4gICAgICAgIGZpbHRlcjogc2hhZG93ID4gMCA/IGBkcm9wLXNoYWRvdygwICR7c2hhZG93fXB4ICR7c2hhZG93ICogMn1weCByZ2JhKDAsMCwwLDAuMykpYCA6IHVuZGVmaW5lZCxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kICE9PSBcInRyYW5zcGFyZW50XCIgPyBiYWNrZ3JvdW5kIDogdW5kZWZpbmVkLFxuICAgICAgICBjb2xvcjogY29sb3IsXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxwYXRoIGNsYXNzTmFtZT1cImluZC1wdWxzZS1yaW5nLS1iYXNlXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9e3JpbmdQYXRofSAvPlxuICAgICAgPHBhdGggY2xhc3NOYW1lPVwiaW5kLXB1bHNlLXJpbmdcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgZD17cmluZ1BhdGh9IC8+XG4gICAgICA8cGF0aCBjbGFzc05hbWU9XCJpbmQtcHVsc2UtcmluZyBpbmQtcHVsc2UtcmluZy0tZGVsYXktMVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPXtyaW5nUGF0aH0gLz5cbiAgICAgIDxwYXRoIGNsYXNzTmFtZT1cImluZC1wdWxzZS1yaW5nIGluZC1wdWxzZS1yaW5nLS1kZWxheS0yXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9e3JpbmdQYXRofSAvPlxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVsc2VSaW5nc011bHRpcGxlSWNvbjtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQkFBeUU7QUFDekUsb0JBQTJCOzs7QUNEM0IsWUFBdUI7QUFDdkIsU0FBUyxnQkFBZ0I7QUFBQSxFQUN2QjtBQUFBLEVBQ0E7QUFBQSxFQUNBLEdBQUc7QUFDTCxHQUFHLFFBQVE7QUFDVCxTQUFvQixnQkFBTSxvQkFBYyxPQUFPLE9BQU8sT0FBTztBQUFBLElBQzNELE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxJQUNmLGFBQWE7QUFBQSxJQUNiLEtBQUs7QUFBQSxJQUNMLG1CQUFtQjtBQUFBLEVBQ3JCLEdBQUcsS0FBSyxHQUFHLFFBQXFCLGdCQUFNLG9CQUFjLFNBQVM7QUFBQSxJQUMzRCxJQUFJO0FBQUEsRUFDTixHQUFHLEtBQUssSUFBSSxNQUFtQixnQkFBTSxvQkFBYyxRQUFRO0FBQUEsSUFDekQsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsR0FBRztBQUFBLEVBQ0wsQ0FBQyxDQUFDO0FBQ0o7QUFDQSxJQUFNLGFBQTJCLGdCQUFNLGlCQUFXLGVBQWU7QUFDakUsSUFBTywwQkFBUTs7O0FDaUJYO0FBekJKLElBQU0seUJBQXlCLENBQUM7QUFBQSxFQUM5QjtBQUFBLEVBQ0EsUUFBUTtBQUFBLEVBQ1IsY0FBYztBQUFBLEVBQ2QsYUFBYTtBQUFBLEVBQ2IsVUFBVTtBQUFBLEVBQ1YsV0FBVztBQUFBLEVBQ1gsU0FBUztBQUFBLEVBQ1QsaUJBQWlCO0FBQUEsRUFD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
