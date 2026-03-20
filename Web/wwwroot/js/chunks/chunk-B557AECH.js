import {
  require_jsx_runtime,
  require_react
} from "./chunk-WUZVRL45.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/system/AudioRecorderMinimal.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var IND_I18N = globalThis.__IND_I18N__ || {};
var indT = (key, fallback) => IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key] || fallback || key;
var IND_BRAND = "#00296b";
var IND_BRAND_RGB = [0, 41, 107];
var IND_AUDIO_WORKLET_PATH = "/js/ind-audio-worklet.js";
var IND_AUDIO_LOG_PREFIX = "[AudioRecorderMinimal]";
function logInfo(...args) {
  if (typeof console !== "undefined" && console.info) {
    console.info(IND_AUDIO_LOG_PREFIX, ...args);
  }
}
function logWarn(...args) {
  if (typeof console !== "undefined" && console.warn) {
    console.warn(IND_AUDIO_LOG_PREFIX, ...args);
  }
}
function logError(...args) {
  if (typeof console !== "undefined" && console.error) {
    console.error(IND_AUDIO_LOG_PREFIX, ...args);
  }
}
function brandRgba(alpha) {
  return `rgba(${IND_BRAND_RGB[0]}, ${IND_BRAND_RGB[1]}, ${IND_BRAND_RGB[2]}, ${alpha})`;
}
function safeErrName(err) {
  return err && err.name ? err.name : "";
}
function safeErrMessage(err) {
  return err && err.message ? err.message : "";
}
function isSecureContextSafe() {
  if (typeof window === "undefined") return true;
  return !!window.isSecureContext;
}
function getLocationSafe() {
  if (typeof window === "undefined") return null;
  if (!window.location) return null;
  return window.location;
}
function isLocalhostHost(hostname) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}
function isHttpIntranetBlocked() {
  const loc = getLocationSafe();
  if (!loc) return false;
  const protocol = loc.protocol || "";
  const hostname = loc.hostname || "";
  if (protocol !== "http:") return false;
  if (isLocalhostHost(hostname)) return false;
  return true;
}
function getAudioWorkletUrl() {
  if (typeof window === "undefined" || !window.location) {
    return IND_AUDIO_WORKLET_PATH;
  }
  try {
    return new URL(IND_AUDIO_WORKLET_PATH, window.location.origin).toString();
  } catch {
    return IND_AUDIO_WORKLET_PATH;
  }
}
function formatTimeMs(ms) {
  const totalSeconds = Math.floor(ms / 1e3);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return `${mm}:${ss}`;
}
function sanitizeFileNameBase(value) {
  if (!value) return "";
  return String(value).trim().replace(/\s+/g, "-").replace(/[\\/:*?"<>|]+/g, "").replace(/-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
}
function buildDownloadFileName(baseName) {
  const safeBase = sanitizeFileNameBase(baseName);
  const now = /* @__PURE__ */ new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return `${safeBase}-${stamp}.wav`;
}
function floatTo16BitPCM(float32Array) {
  const out = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    out[i] = s < 0 ? s * 32768 : s * 32767;
  }
  return out;
}
function encodeWav(args) {
  const samples16 = args.samples16;
  const sampleRate = args.sampleRate;
  const numChannels = args.numChannels;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples16.length * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);
  let offset = 0;
  function writeString(s) {
    for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i));
    offset += s.length;
  }
  function writeUint32(v) {
    view.setUint32(offset, v, true);
    offset += 4;
  }
  function writeUint16(v) {
    view.setUint16(offset, v, true);
    offset += 2;
  }
  writeString("RIFF");
  writeUint32(36 + dataSize);
  writeString("WAVE");
  writeString("fmt ");
  writeUint32(16);
  writeUint16(1);
  writeUint16(numChannels);
  writeUint32(sampleRate);
  writeUint32(byteRate);
  writeUint16(blockAlign);
  writeUint16(16);
  writeString("data");
  writeUint32(dataSize);
  for (let j = 0; j < samples16.length; j++, offset += 2) {
    view.setInt16(offset, samples16[j], true);
  }
  return new Blob([buffer], { type: "audio/wav" });
}
function buildSecondLevels(samples, sampleRate) {
  if (!samples || !samples.length || !sampleRate) return [];
  const seconds = Math.max(1, Math.ceil(samples.length / sampleRate));
  const levels = new Array(seconds).fill(0);
  let max = 0;
  for (let s = 0; s < seconds; s++) {
    const start = s * sampleRate;
    const end = Math.min((s + 1) * sampleRate, samples.length);
    let sum = 0;
    const len = end - start;
    for (let i = start; i < end; i++) {
      const v = samples[i];
      sum += v * v;
    }
    const rms = Math.sqrt(sum / Math.max(1, len));
    levels[s] = rms;
    if (rms > max) max = rms;
  }
  if (max <= 0) return levels;
  return levels.map((v) => Math.min(1, Math.pow(v / max, 0.75)));
}
function drawRoundedRect(ctx, x, y, w, h, r) {
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
    return;
  }
  ctx.fillRect(x, y, w, h);
}
function buildHttpMicBlockedMessage() {
  return indT(
    "AudioRecorder_Error_HttpBlocked",
    "Chrome blocks microphone on HTTP (intranet). Use HTTPS or open the app via http://localhost. For dev, configure Chrome to treat your HTTP origin as secure."
  );
}
function buildMicErrorMessage(err) {
  const name = safeErrName(err);
  if (isHttpIntranetBlocked() && !isSecureContextSafe()) {
    return buildHttpMicBlockedMessage();
  }
  if (name === "NotAllowedError" || name === "PermissionDeniedError") {
    return indT(
      "AudioRecorder_Error_PermissionDenied",
      "Microphone permission denied. Allow it in the browser and reload the page."
    );
  }
  if (name === "NotFoundError" || name === "DevicesNotFoundError") {
    return indT("AudioRecorder_Error_NoDevice", "No microphone device found. Connect one and try again.");
  }
  if (name === "NotReadableError" || name === "TrackStartError") {
    return indT(
      "AudioRecorder_Error_DeviceBusy",
      "The microphone is busy or could not start. Close other apps (Teams, Zoom) and try again."
    );
  }
  if (name === "SecurityError") {
    return indT(
      "AudioRecorder_Error_Security",
      "Blocked by browser security. In Chrome, use HTTPS or corporate policy to allow the mic on intranet."
    );
  }
  if (name === "OverconstrainedError" || name === "ConstraintNotSatisfiedError") {
    return indT(
      "AudioRecorder_Error_Constraints",
      "Audio constraints could not be satisfied. Try another microphone or configuration."
    );
  }
  return indT(
    "AudioRecorder_Error_Generic",
    "Could not start recording. Check microphone permissions. In Chrome, it usually requires HTTPS or localhost."
  );
}
function runSelfTests() {
  try {
    console.assert(formatTimeMs(0) === "00:00", "formatTimeMs(0) should be 00:00");
    console.assert(formatTimeMs(61e3) === "01:01", "formatTimeMs(61000) should be 01:01");
    console.assert(formatTimeMs(3661e3) === "61:01", "formatTimeMs(3661000) should be 61:01");
    console.assert(formatTimeMs(36e5) === "60:00", "formatTimeMs(3600000) should be 60:00");
    console.assert(formatTimeMs(59e3) === "00:59", "formatTimeMs(59000) should be 00:59");
    console.assert(formatTimeMs(6e4) === "01:00", "formatTimeMs(60000) should be 01:00");
    const f = new Float32Array([0, 1, -1, 0.5, -0.5]);
    const pcm = floatTo16BitPCM(f);
    console.assert(pcm.length === 5, "PCM length should match input");
    console.assert(pcm[1] === 32767, "1.0 should map to 32767");
    console.assert(pcm[2] === -32768, "-1.0 should map to -32768");
    const wav = encodeWav({ samples16: new Int16Array([0, 1, -1]), sampleRate: 48e3, numChannels: 1 });
    console.assert(wav && wav.type === "audio/wav", "WAV blob should be audio/wav");
    console.assert(brandRgba(0.5).startsWith("rgba("), "brandRgba should return rgba(...)");
    console.log("AudioRecorderMinimal self-tests: OK");
  } catch (e) {
    console.error("AudioRecorderMinimal self-tests: FAILED", e);
  }
}
function AudioRecorderMinimal({
  embedded = false,
  onAudioReady,
  onAudioCleared,
  onTranscribe,
  transcribeBusy = false,
  transcribeLabel,
  transcribeBusyLabel,
  onRecordingError
}) {
  const [canRecord, setCanRecord] = (0, import_react.useState)(false);
  const [uiError, setUiError] = (0, import_react.useState)("");
  const [uiHint, setUiHint] = (0, import_react.useState)("");
  const [isRecording, setIsRecording] = (0, import_react.useState)(false);
  const [isPaused, setIsPaused] = (0, import_react.useState)(false);
  const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
  const [elapsedMs, setElapsedMs] = (0, import_react.useState)(0);
  const [wavBlob, setWavBlob] = (0, import_react.useState)(null);
  const [wavUrl, setWavUrl] = (0, import_react.useState)(null);
  const [wavFileName, setWavFileName] = (0, import_react.useState)("");
  const [wavLevels, setWavLevels] = (0, import_react.useState)([]);
  const [wavDurationSec, setWavDurationSec] = (0, import_react.useState)(0);
  const [playbackRemainingSec, setPlaybackRemainingSec] = (0, import_react.useState)(0);
  const [playbackSecond, setPlaybackSecond] = (0, import_react.useState)(0);
  const wavUrlRef = (0, import_react.useRef)(null);
  const wavLevelsRef = (0, import_react.useRef)([]);
  const audioElRef = (0, import_react.useRef)(null);
  const isMountedRef = (0, import_react.useRef)(false);
  const streamRef = (0, import_react.useRef)(null);
  const audioCtxRef = (0, import_react.useRef)(null);
  const sourceRef = (0, import_react.useRef)(null);
  const analyserRef = (0, import_react.useRef)(null);
  const processorRef = (0, import_react.useRef)(null);
  const zeroGainRef = (0, import_react.useRef)(null);
  const workletNodeRef = (0, import_react.useRef)(null);
  const sampleRateRef = (0, import_react.useRef)(48e3);
  const chunksRef = (0, import_react.useRef)([]);
  const startedAtRef = (0, import_react.useRef)(null);
  const accumulatedMsRef = (0, import_react.useRef)(0);
  const timerIdRef = (0, import_react.useRef)(null);
  const rafIdRef = (0, import_react.useRef)(null);
  const barsCanvasRef = (0, import_react.useRef)(null);
  const barWidthPx = 2;
  const barGapPx = 2;
  const barMinCount = 48;
  const barMaxCount = 120;
  const eqLastRef = (0, import_react.useRef)([]);
  const isRecordingRef = (0, import_react.useRef)(false);
  const isPausedRef = (0, import_react.useRef)(false);
  const downloadLabel = indT("AudioRecorder_Download");
  const downloadBaseName = indT("AudioRecorder_Download_FileName");
  (0, import_react.useEffect)(() => {
    isMountedRef.current = true;
    const ok = typeof navigator !== "undefined" && !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    setCanRecord(ok);
    if (typeof window !== "undefined" && window.__IND_AUDIO_RECORDER_TESTS__ === true) {
      runSelfTests();
    }
    if (typeof window !== "undefined") {
      if (isHttpIntranetBlocked() && !isSecureContextSafe()) {
        setUiError(buildHttpMicBlockedMessage());
        const loc = getLocationSafe();
        if (loc) setUiHint(indT("AudioRecorder_Hint_Origin", "Current origin: {0}").replace("{0}", loc.origin));
      }
    }
    syncCanvasSize();
    drawEqIdle();
    function onResize() {
      syncCanvasSize();
      drawEqIdle();
    }
    window.addEventListener("resize", onResize);
    return () => {
      isMountedRef.current = false;
      window.removeEventListener("resize", onResize);
      safeStopPlayback();
      safeStopRecordingInternal({ keepWav: true, skipUiState: true });
      if (wavUrlRef.current) {
        try {
          URL.revokeObjectURL(wavUrlRef.current);
        } catch {
        }
      }
    };
  }, []);
  (0, import_react.useEffect)(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);
  (0, import_react.useEffect)(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);
  (0, import_react.useEffect)(() => {
    wavUrlRef.current = wavUrl;
  }, [wavUrl]);
  (0, import_react.useEffect)(() => {
    wavLevelsRef.current = wavLevels;
  }, [wavLevels]);
  (0, import_react.useEffect)(() => {
    const audioEl = audioElRef.current;
    if (!audioEl) return void 0;
    function onEnded() {
      setIsPlaying(false);
      if (wavDurationSec > 0) {
        setPlaybackRemainingSec(wavDurationSec);
        setPlaybackSecond(0);
      }
    }
    function onPause() {
      setIsPlaying(false);
    }
    function onPlay() {
      setIsPlaying(true);
    }
    function onLoadedMetadata() {
      const duration = Math.ceil(audioEl.duration || 0);
      if (duration > 0) {
        setWavDurationSec(duration);
        setPlaybackRemainingSec(duration);
        setPlaybackSecond(0);
      }
    }
    function onTimeUpdate() {
      const total = wavDurationSec > 0 ? wavDurationSec : Math.ceil(audioEl.duration || 0);
      if (total <= 0) return;
      const current = audioEl.currentTime || 0;
      const remaining = Math.max(0, total - current);
      setPlaybackRemainingSec(remaining);
      setPlaybackSecond(Math.max(0, Math.min(total - 1, Math.floor(current))));
    }
    audioEl.addEventListener("ended", onEnded);
    audioEl.addEventListener("pause", onPause);
    audioEl.addEventListener("play", onPlay);
    audioEl.addEventListener("loadedmetadata", onLoadedMetadata);
    audioEl.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      audioEl.removeEventListener("ended", onEnded);
      audioEl.removeEventListener("pause", onPause);
      audioEl.removeEventListener("play", onPlay);
      audioEl.removeEventListener("loadedmetadata", onLoadedMetadata);
      audioEl.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [wavDurationSec]);
  (0, import_react.useEffect)(() => {
    if (isRecording && !isPaused) {
      startEqLoop();
    } else {
      stopEqLoop();
      if (wavLevelsRef.current && wavLevelsRef.current.length > 0) {
        drawEqWaveform(playbackSecond);
      } else {
        drawEqIdle();
      }
    }
  }, [isRecording, isPaused]);
  (0, import_react.useEffect)(() => {
    if (!isRecording && wavLevelsRef.current && wavLevelsRef.current.length > 0) {
      drawEqWaveform(playbackSecond);
    }
  }, [playbackSecond, wavLevels, isRecording]);
  function safeSetState(fn) {
    if (!isMountedRef.current) return;
    fn();
  }
  const notifyRecordingError = (message) => {
    if (typeof onRecordingError !== "function") return;
    try {
      onRecordingError(message);
    } catch {
    }
  };
  function safeStopPlayback() {
    const audioEl = audioElRef.current;
    if (!audioEl) return;
    try {
      audioEl.pause();
      audioEl.currentTime = 0;
    } catch {
    }
    safeSetState(() => {
      setIsPlaying(false);
    });
  }
  function startTimer() {
    if (timerIdRef.current) return;
    startedAtRef.current = Date.now();
    timerIdRef.current = window.setInterval(() => {
      if (!startedAtRef.current) return;
      const now = Date.now();
      const current = accumulatedMsRef.current + (now - startedAtRef.current);
      safeSetState(() => {
        setElapsedMs(current);
      });
    }, 200);
  }
  function pauseTimer() {
    if (!startedAtRef.current) return;
    const now = Date.now();
    accumulatedMsRef.current = accumulatedMsRef.current + (now - startedAtRef.current);
    startedAtRef.current = null;
    if (timerIdRef.current) {
      window.clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  }
  function resetTimer() {
    accumulatedMsRef.current = 0;
    startedAtRef.current = null;
    if (timerIdRef.current) {
      window.clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
    safeSetState(() => {
      setElapsedMs(0);
    });
  }
  async function startRecording() {
    if (!canRecord) {
      logWarn("getUserMedia not available or blocked.");
      const loc = getLocationSafe();
      const blocked = isHttpIntranetBlocked() && !isSecureContextSafe();
      const errorMessage = blocked ? buildHttpMicBlockedMessage() : indT("AudioRecorder_Error_Unsupported", "Your browser does not support getUserMedia.");
      const hintMessage = blocked && loc ? indT("AudioRecorder_Hint_Origin", "Current origin: {0}").replace("{0}", loc.origin) : "";
      safeSetState(() => {
        setUiError(errorMessage);
        setUiHint(hintMessage);
      });
      if (errorMessage) {
        notifyRecordingError(errorMessage);
      }
      return;
    }
    safeStopPlayback();
    safeSetState(() => {
      setUiError("");
      setUiHint("");
    });
    safeStopRecordingInternal({ keepWav: true, skipUiState: true });
    if (wavUrlRef.current) {
      try {
        URL.revokeObjectURL(wavUrlRef.current);
      } catch {
      }
    }
    safeSetState(() => {
      setWavUrl(null);
      setWavBlob(null);
      setWavFileName("");
    });
    setWavLevels([]);
    setWavDurationSec(0);
    setPlaybackRemainingSec(0);
    setPlaybackSecond(0);
    if (typeof onAudioCleared === "function") {
      try {
        onAudioCleared();
      } catch {
      }
    }
    chunksRef.current = [];
    try {
      const preferredConstraints = {
        channelCount: 1,
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      };
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: preferredConstraints });
      } catch (err) {
        logWarn("Preferred audio constraints failed. Retrying with defaults.", err);
      }
      if (!stream) {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      streamRef.current = stream;
      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCtor) throw new Error(indT("AudioRecorder_Error_NoAudioContext", "AudioContext is not available."));
      const audioCtx = new AudioContextCtor();
      audioCtxRef.current = audioCtx;
      sampleRateRef.current = audioCtx.sampleRate;
      try {
        await audioCtx.resume();
      } catch {
      }
      const source = audioCtx.createMediaStreamSource(stream);
      sourceRef.current = source;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.88;
      analyserRef.current = analyser;
      const zeroGain = audioCtx.createGain();
      zeroGain.gain.value = 0;
      zeroGainRef.current = zeroGain;
      workletNodeRef.current = null;
      processorRef.current = null;
      let captureNode = null;
      const canWorklet = !!(audioCtx.audioWorklet && typeof audioCtx.audioWorklet.addModule === "function");
      if (canWorklet) {
        try {
          const workletUrl = getAudioWorkletUrl();
          await audioCtx.audioWorklet.addModule(workletUrl);
          const workletNode = new AudioWorkletNode(audioCtx, "ind-audio-capture");
          workletNodeRef.current = workletNode;
          captureNode = workletNode;
          workletNode.onprocessorerror = (event) => {
            logError("AudioWorklet processor error", event);
          };
          workletNode.port.onmessageerror = (event) => {
            logError("AudioWorklet message error", event);
          };
          workletNode.port.onmessage = (event) => {
            const data = event && event.data ? event.data : null;
            if (!data || data.type !== "chunk") return;
            if (!isRecordingRef.current || isPausedRef.current) return;
            const raw = data.samples;
            if (!raw) return;
            let chunk = null;
            if (raw instanceof Float32Array) chunk = raw;
            else if (raw.buffer) chunk = new Float32Array(raw.buffer);
            else if (raw.byteLength) chunk = new Float32Array(raw);
            if (!chunk || !chunk.length) return;
            chunksRef.current.push(chunk);
          };
          logInfo("AudioWorklet capture enabled", workletUrl);
        } catch (err) {
          logWarn("AudioWorklet failed. Falling back to ScriptProcessor.", err);
        }
      } else {
        logWarn("AudioWorklet not supported. Using ScriptProcessor.");
      }
      if (!captureNode) {
        const processor = audioCtx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;
        captureNode = processor;
        processor.onaudioprocess = (e) => {
          if (!isRecordingRef.current || isPausedRef.current) return;
          const input = e.inputBuffer.getChannelData(0);
          chunksRef.current.push(new Float32Array(input));
        };
      }
      source.connect(analyser);
      analyser.connect(zeroGain);
      source.connect(captureNode);
      captureNode.connect(zeroGain);
      zeroGain.connect(audioCtx.destination);
      safeSetState(() => {
        setIsRecording(true);
        setIsPaused(false);
      });
      resetTimer();
      startTimer();
    } catch (err) {
      safeStopRecordingInternal({ keepWav: false, skipUiState: false });
      const msg = buildMicErrorMessage(err);
      const name = safeErrName(err);
      const message = safeErrMessage(err);
      safeSetState(() => {
        setUiError(msg);
        if (name) {
          const detail = message ? `${name} - ${message}` : name;
          setUiHint(indT("AudioRecorder_Hint_Technical", "Technical details: {0}").replace("{0}", detail));
        }
      });
      if (msg) {
        notifyRecordingError(msg);
      }
      logError("Audio recorder start failed", err);
    }
  }
  function pauseRecording() {
    if (!isRecording) return;
    safeSetState(() => {
      setIsPaused(true);
    });
    if (workletNodeRef.current && workletNodeRef.current.port) {
      try {
        workletNodeRef.current.port.postMessage({ type: "setRecording", value: false });
      } catch {
      }
    }
    pauseTimer();
  }
  function resumeRecording() {
    if (!isRecording) return;
    safeSetState(() => {
      setIsPaused(false);
    });
    if (workletNodeRef.current && workletNodeRef.current.port) {
      try {
        workletNodeRef.current.port.postMessage({ type: "setRecording", value: true });
      } catch {
      }
    }
    startTimer();
  }
  async function finishRecording() {
    if (!isRecording) return;
    pauseTimer();
    if (workletNodeRef.current && workletNodeRef.current.port) {
      try {
        workletNodeRef.current.port.postMessage({ type: "setRecording", value: false });
      } catch {
      }
      await new Promise((resolve) => window.setTimeout(resolve, 30));
    }
    if (!chunksRef.current.length) {
      safeStopRecordingInternal({ keepWav: false, skipUiState: false });
      resetTimer();
      return;
    }
    const all = chunksRef.current;
    const totalLen = all.reduce((sum, a) => sum + a.length, 0);
    const merged = new Float32Array(totalLen);
    let offset = 0;
    for (let i = 0; i < all.length; i++) {
      merged.set(all[i], offset);
      offset += all[i].length;
    }
    const samples16 = floatTo16BitPCM(merged);
    const wav = encodeWav({ samples16, sampleRate: sampleRateRef.current, numChannels: 1 });
    safeStopRecordingInternal({ keepWav: true, skipUiState: false });
    const levels = buildSecondLevels(merged, sampleRateRef.current);
    const durationSec = Math.max(1, Math.ceil(merged.length / sampleRateRef.current));
    const url = URL.createObjectURL(wav);
    const fileName = buildDownloadFileName(downloadBaseName);
    safeSetState(() => {
      setWavBlob(wav);
      setWavUrl(url);
      setWavFileName(fileName);
      setWavLevels(levels);
      setWavDurationSec(durationSec);
      setPlaybackRemainingSec(durationSec);
      setPlaybackSecond(0);
    });
    if (typeof onAudioReady === "function") {
      try {
        onAudioReady(wav);
      } catch {
      }
    }
  }
  function clearRecording() {
    safeStopPlayback();
    safeStopRecordingInternal({ keepWav: false, skipUiState: false });
    if (wavUrlRef.current) {
      try {
        URL.revokeObjectURL(wavUrlRef.current);
      } catch {
      }
    }
    safeSetState(() => {
      setWavUrl(null);
      setWavBlob(null);
      setWavFileName("");
      setUiError("");
      setUiHint("");
    });
    setWavLevels([]);
    setWavDurationSec(0);
    setPlaybackRemainingSec(0);
    setPlaybackSecond(0);
    if (typeof onAudioCleared === "function") {
      try {
        onAudioCleared();
      } catch {
      }
    }
    chunksRef.current = [];
    resetTimer();
  }
  function safeStopRecordingInternal(args) {
    const keepWav = args.keepWav;
    const skipUiState = args.skipUiState;
    stopEqLoop();
    if (!keepWav) resetTimer();
    try {
      if (workletNodeRef.current) {
        try {
          if (workletNodeRef.current.port) {
            workletNodeRef.current.port.postMessage({ type: "setRecording", value: false });
          }
        } catch {
        }
        workletNodeRef.current.disconnect();
      }
      if (processorRef.current) processorRef.current.disconnect();
      if (analyserRef.current) analyserRef.current.disconnect();
      if (sourceRef.current) sourceRef.current.disconnect();
      if (zeroGainRef.current) zeroGainRef.current.disconnect();
    } catch {
    }
    try {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") audioCtxRef.current.close();
    } catch {
    }
    try {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        for (let i = 0; i < tracks.length; i++) tracks[i].stop();
      }
    } catch {
    }
    processorRef.current = null;
    analyserRef.current = null;
    sourceRef.current = null;
    zeroGainRef.current = null;
    workletNodeRef.current = null;
    audioCtxRef.current = null;
    streamRef.current = null;
    if (!skipUiState) {
      safeSetState(() => {
        setIsRecording(false);
        setIsPaused(false);
      });
    }
  }
  function togglePlay() {
    const audioEl = audioElRef.current;
    if (!audioEl || !wavUrl) return;
    try {
      if (audioEl.paused) audioEl.play();
      else audioEl.pause();
    } catch {
    }
  }
  function syncCanvasSize() {
    const canvas = barsCanvasRef.current;
    if (!canvas) return;
    const w = Math.max(1, Math.floor(canvas.clientWidth));
    const h = Math.max(1, Math.floor(canvas.clientHeight));
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
  }
  function startEqLoop() {
    if (rafIdRef.current) return;
    const canvas = barsCanvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;
    syncCanvasSize();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const freq = new Uint8Array(analyser.frequencyBinCount);
    function loop() {
      rafIdRef.current = requestAnimationFrame(loop);
      analyser.getByteFrequencyData(freq);
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = brandRgba(0.1);
      ctx.fillRect(0, Math.floor(h / 2), w, 1);
      const gap = barGapPx;
      const barW = barWidthPx;
      let count = Math.floor((w + gap) / (barW + gap));
      if (count < barMinCount) count = barMinCount;
      if (count > barMaxCount) count = barMaxCount;
      const totalW = count * barW + (count - 1) * gap;
      const startX = Math.floor((w - totalW) / 2);
      const maxH = Math.floor(h * 0.92);
      if (!eqLastRef.current || eqLastRef.current.length !== count) {
        eqLastRef.current = new Array(count).fill(0);
      }
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(i / count * freq.length);
        const v = Math.pow(freq[idx] / 255, 0.9);
        const last = eqLastRef.current[i] || 0;
        const smooth = last * 0.78 + v * 0.22;
        eqLastRef.current[i] = smooth;
        const barH = Math.max(2, Math.floor(smooth * maxH));
        const x = startX + i * (barW + gap);
        const y = Math.floor((h - barH) / 2);
        ctx.fillStyle = brandRgba(0.42);
        ctx.fillRect(x, y, barW, barH);
      }
    }
    rafIdRef.current = requestAnimationFrame(loop);
  }
  function stopEqLoop() {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }
  function drawEqIdle() {
    const canvas = barsCanvasRef.current;
    if (!canvas) return;
    syncCanvasSize();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = brandRgba(0.08);
    ctx.fillRect(0, Math.floor(h / 2), w, 1);
    const gap = barGapPx;
    const barW = barWidthPx;
    let count = Math.floor((w + gap) / (barW + gap));
    if (count < barMinCount) count = barMinCount;
    if (count > barMaxCount) count = barMaxCount;
    const totalW = count * barW + (count - 1) * gap;
    const startX = Math.floor((w - totalW) / 2);
    const maxH = Math.floor(h * 0.35);
    for (let i = 0; i < count; i++) {
      const v = 0.18 + i % 9 * 0.01;
      const barH = Math.max(2, Math.floor(v * maxH));
      const x = startX + i * (barW + gap);
      const y = Math.floor((h - barH) / 2);
      ctx.fillStyle = brandRgba(0.16);
      ctx.fillRect(x, y, barW, barH);
    }
  }
  function drawEqWaveform(activeSecond) {
    const canvas = barsCanvasRef.current;
    if (!canvas) return;
    syncCanvasSize();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const levels = wavLevelsRef.current || [];
    if (!levels.length) {
      drawEqIdle();
      return;
    }
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = brandRgba(0.1);
    ctx.fillRect(0, Math.floor(h / 2), w, 1);
    const maxH = Math.floor(h * 0.9);
    const minH = 3;
    const barW = 3;
    const gap = 2;
    const minBars = 48;
    const maxBars = 140;
    const fitBars = Math.max(1, Math.floor((w + gap) / (barW + gap)));
    const count = Math.max(minBars, Math.min(maxBars, Math.max(levels.length, fitBars)));
    const totalW = count * barW + (count - 1) * gap;
    const startX = Math.max(0, Math.floor((w - totalW) / 2));
    const durationSec = Math.max(1, wavDurationSec || levels.length || 1);
    const activeIndex = Math.max(0, Math.min(count - 1, Math.floor(activeSecond / durationSec * (count - 1))));
    for (let i = 0; i < count; i++) {
      const t = count > 1 ? i / (count - 1) : 0;
      const rawIndex = t * Math.max(0, levels.length - 1);
      const low = Math.floor(rawIndex);
      const high = Math.min(levels.length - 1, low + 1);
      const frac = rawIndex - low;
      const vLow = levels[low] || 0;
      const vHigh = levels[high] || 0;
      const v = vLow * (1 - frac) + vHigh * frac;
      const barH = Math.max(minH, Math.floor(v * (maxH - minH) + minH));
      const x = startX + i * (barW + gap);
      const y = Math.floor((h - barH) / 2);
      const isActive = i === activeIndex;
      ctx.fillStyle = isActive ? brandRgba(0.78) : brandRgba(0.28);
      drawRoundedRect(ctx, x, y, barW, barH, Math.min(6, Math.floor(barW / 2)));
    }
  }
  function onCenterClick() {
    if (!isRecording) {
      startRecording();
      return;
    }
    if (isPaused) resumeRecording();
    else pauseRecording();
  }
  function onRightClick() {
    if (isRecording) {
      finishRecording();
      return;
    }
    if (wavBlob) clearRecording();
  }
  const centerLabel = !isRecording ? indT("AudioRecorder_Record", "Record") : isPaused ? indT("AudioRecorder_Resume", "Resume") : indT("AudioRecorder_Pause", "Pause");
  const totalWavMs = wavDurationSec > 0 ? wavDurationSec * 1e3 : 0;
  const remainingWavMs = wavDurationSec > 0 ? Math.max(0, playbackRemainingSec * 1e3) : 0;
  const timerText = isRecording ? formatTimeMs(elapsedMs) : wavUrl ? formatTimeMs(remainingWavMs || totalWavMs) : formatTimeMs(0);
  const isActiveRec = isRecording && !isPaused;
  const statusText = uiError ? "" : isActiveRec ? indT("AudioRecorder_Status_Recording", "Recording") : isPaused ? indT("AudioRecorder_Status_Paused", "Paused") : wavUrl ? indT("AudioRecorder_Status_ReadyToPlay", "Ready to play") : indT("AudioRecorder_Status_Ready", "Ready");
  const timerAlpha = isActiveRec ? 0.55 : isPaused ? 0.46 : 0.4;
  const statusAlpha = 0.35;
  const cardBg = "radial-gradient(700px circle at 18% 0%, rgba(0, 41, 107, 0.06), transparent 55%)";
  const outerClassName = embedded ? "w-full" : "w-full min-h-[280px] flex items-center justify-center p-4 sm:p-6";
  const outerStyle = embedded ? void 0 : {
    backgroundImage: "radial-gradient(900px circle at 20% 20%, rgba(0, 41, 107, 0.08), transparent 60%)",
    backgroundColor: "rgba(0, 41, 107, 0.05)",
    fontFamily: '"Montserrat", sans-serif'
  };
  const cardClassName = embedded ? "relative w-full rounded-xl sm:rounded-2xl bg-white border shadow-xl" : "relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[520px] rounded-xl sm:rounded-2xl bg-white border shadow-xl";
  const showTranscribeButton = !!wavBlob && typeof onTranscribe === "function";
  const transcribeText = transcribeLabel || indT("TextEditor_Transcribe", "Transcribe");
  const transcribeBusyText = transcribeBusyLabel || indT("TextEditor_Transcribing", "Transcribing");
  const showDownloadButton = false;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: outerClassName, style: outerStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: cardClassName,
      style: { borderColor: "rgba(0, 41, 107, 0.18)", backgroundImage: cardBg },
      children: [
        !wavUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-4 top-4 sm:right-5 sm:top-5", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: "font-light italic tabular-nums text-[16px] sm:text-[18px] leading-none tracking-[0.14em]",
            style: { color: brandRgba(timerAlpha) },
            children: timerText
          }
        ) }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: `px-5 sm:px-7 pt-3 sm:pt-4 ${wavUrl ? "pb-0 sm:pb-1" : "pb-1 sm:pb-2"}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", { ref: barsCanvasRef, className: "w-full h-12 sm:h-16" }) }),
              wavUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-0.5 flex items-center justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "div",
                {
                  className: "font-light italic tabular-nums text-[16px] sm:text-[18px] leading-none tracking-[0.14em]",
                  style: { color: brandRgba(timerAlpha) },
                  children: timerText
                }
              ) }) : null
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `px-5 sm:px-7 pb-4 sm:pb-5 ${wavUrl ? "pt-1 sm:pt-2" : "pt-2 sm:pt-3"}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-center", style: { gap: "24px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: togglePlay,
                disabled: !wavUrl,
                className: "h-12 w-12 sm:h-14 sm:w-14 rounded-md border flex items-center justify-center transition shadow-xs hover:shadow-md active:scale-95",
                style: {
                  borderColor: wavUrl ? "rgba(0, 41, 107, 0.22)" : "rgba(0, 41, 107, 0.18)",
                  backgroundColor: wavUrl ? "rgba(0, 41, 107, 0.06)" : "rgba(0, 41, 107, 0.04)",
                  opacity: wavUrl ? 1 : 0.45,
                  cursor: wavUrl ? "pointer" : "not-allowed"
                },
                "aria-label": indT("AudioRecorder_Play", "Play"),
                title: wavUrl ? isPlaying ? indT("AudioRecorder_Pause", "Pause") : indT("AudioRecorder_Play", "Play") : indT("AudioRecorder_NoAudio", "No audio"),
                children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", style: { color: IND_BRAND }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "6", y: "5", width: "4", height: "14", rx: "1", fill: "currentColor" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "14", y: "5", width: "4", height: "14", rx: "1", fill: "currentColor" })
                ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", style: { color: IND_BRAND }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 7L19 12L9 17V7Z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: onCenterClick,
                disabled: !canRecord,
                className: "h-14 w-14 sm:h-16 sm:w-16 rounded-md border flex items-center justify-center transition shadow-xs hover:shadow-md active:scale-95",
                style: {
                  borderColor: "rgba(0, 41, 107, 0.18)",
                  backgroundColor: canRecord ? "rgba(0, 41, 107, 0.06)" : "rgba(0, 41, 107, 0.04)",
                  boxShadow: isActiveRec ? "0 0 0 7px rgba(0, 41, 107, 0.08), 0 14px 34px rgba(0, 41, 107, 0.14)" : "0 10px 22px rgba(0, 41, 107, 0.08)",
                  opacity: canRecord ? 1 : 0.45,
                  cursor: canRecord ? "pointer" : "not-allowed"
                },
                "aria-label": centerLabel,
                title: centerLabel,
                children: !isRecording ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-5 w-5 rounded-md bg-red-500" }) : isPaused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", style: { color: IND_BRAND }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 7L19 12L9 17V7Z", fill: "currentColor" }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", style: { color: IND_BRAND }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "6", y: "5", width: "4", height: "14", rx: "1", fill: "currentColor" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "14", y: "5", width: "4", height: "14", rx: "1", fill: "currentColor" })
                ] })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: onRightClick,
                disabled: !isRecording,
                className: "h-12 w-12 sm:h-14 sm:w-14 rounded-md border flex items-center justify-center transition shadow-xs hover:shadow-md active:scale-95",
                style: {
                  borderColor: isRecording ? "rgba(0, 41, 107, 0.22)" : "rgba(0, 41, 107, 0.18)",
                  backgroundColor: isRecording ? "rgba(0, 41, 107, 0.06)" : "rgba(0, 41, 107, 0.04)",
                  opacity: isRecording ? 1 : 0.45,
                  cursor: isRecording ? "pointer" : "not-allowed"
                },
                "aria-label": isRecording ? indT("AudioRecorder_Stop", "Stop") : indT("AudioRecorder_Cancel", "Cancel"),
                title: isRecording ? indT("AudioRecorder_Stop", "Stop") : indT("AudioRecorder_Cancel", "Cancel"),
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", style: { color: IND_BRAND }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "7", y: "7", width: "10", height: "10", rx: "1", fill: "currentColor" }) })
              }
            )
          ] }),
          showDownloadButton || showTranscribeButton ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mt-3 flex items-center justify-end gap-2 flex-wrap", children: [
            showDownloadButton ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "a",
              {
                href: wavUrl || void 0,
                download: wavFileName || void 0,
                className: "px-4 py-1.5 rounded-md border text-[13px] font-medium transition shadow-xs hover:shadow-md active:scale-95",
                style: {
                  borderColor: "rgba(0, 41, 107, 0.22)",
                  backgroundColor: "rgba(0, 41, 107, 0.04)",
                  color: IND_BRAND
                },
                "aria-label": downloadLabel,
                title: downloadLabel,
                children: downloadLabel
              }
            ) : null,
            showTranscribeButton ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: () => onTranscribe && onTranscribe(wavBlob),
                disabled: transcribeBusy,
                className: "px-4 py-1.5 rounded-md border text-[13px] font-medium transition shadow-xs hover:shadow-md active:scale-95",
                style: {
                  borderColor: "rgba(0, 41, 107, 0.22)",
                  backgroundColor: transcribeBusy ? "rgba(0, 41, 107, 0.08)" : "rgba(0, 41, 107, 0.04)",
                  color: IND_BRAND,
                  opacity: transcribeBusy ? 0.7 : 1,
                  cursor: transcribeBusy ? "not-allowed" : "pointer"
                },
                "aria-label": transcribeBusy ? transcribeBusyText : transcribeText,
                title: transcribeBusy ? transcribeBusyText : transcribeText,
                children: transcribeBusy ? transcribeBusyText : transcribeText
              }
            ) : null
          ] }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", { ref: audioElRef, src: wavUrl || void 0, className: "hidden" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 flex flex-col items-center justify-center gap-1 min-h-[22px]", children: uiError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs text-rose-700 text-center leading-tight", children: uiError }),
            uiHint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-[11px] text-slate-600 text-center leading-tight", children: uiHint }) : null
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs leading-tight", style: { color: brandRgba(statusAlpha) }, children: statusText }) })
        ] })
      ]
    }
  ) });
}

export {
  AudioRecorderMinimal
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL3N5c3RlbS9BdWRpb1JlY29yZGVyTWluaW1hbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmNvbnN0IElORF9JMThOID0gZ2xvYmFsVGhpcy5fX0lORF9JMThOX18gfHwge307XHJcbmNvbnN0IGluZFQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrPzogc3RyaW5nKSA9PlxyXG4gIChJTkRfSTE4TiAmJiB0eXBlb2YgSU5EX0kxOE5ba2V5XSA9PT0gXCJzdHJpbmdcIiAmJiBJTkRfSTE4TltrZXldKSB8fCBmYWxsYmFjayB8fCBrZXk7XHJcblxyXG50eXBlIEF1ZGlvUmVjb3JkZXJQcm9wcyA9IHtcclxuICBlbWJlZGRlZD86IGJvb2xlYW47XHJcbiAgb25BdWRpb1JlYWR5PzogKHdhdjogQmxvYikgPT4gdm9pZDtcclxuICBvbkF1ZGlvQ2xlYXJlZD86ICgpID0+IHZvaWQ7XHJcbiAgb25UcmFuc2NyaWJlPzogKHdhdjogQmxvYikgPT4gdm9pZCB8IFByb21pc2U8dm9pZD47XHJcbiAgdHJhbnNjcmliZUJ1c3k/OiBib29sZWFuO1xyXG4gIHRyYW5zY3JpYmVMYWJlbD86IHN0cmluZztcclxuICB0cmFuc2NyaWJlQnVzeUxhYmVsPzogc3RyaW5nO1xyXG4gIG9uUmVjb3JkaW5nRXJyb3I/OiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gQXVkaW9SZWNvcmRlck1pbmltYWxcclxuLy8gTWluaW1hbCBVSSByZWNvcmRlciB0aGF0IHByb2R1Y2VzIGEgV0FWIChQQ00gMTYtYml0KSBibG9iLlxyXG4vLyBOb3RlczpcclxuLy8gLSBSZWNvcmRzIG1vbm8gYXVkaW8gYW5kIGV4cG9ydHMgLndhdi5cclxuLy8gLSBDZW50ZXIgYnV0dG9uIHRvZ2dsZXMgcmVjb3JkIGFuZCBwYXVzZS9yZXN1bWUuXHJcbi8vIC0gUmlnaHQgYnV0dG9uIHN0b3BzIGFuZCBmaW5hbGl6ZXMgV0FWIHdoaWxlIHJlY29yZGluZywgb3IgY2xlYXJzIHdoZW4gaWRsZS5cclxuLy8gLSBVc2VzIFNjcmlwdFByb2Nlc3NvciBmb3Igc2ltcGxpY2l0eSAod29ya3MgZm9yIGRlbW9zLCBidXQgaXMgZGVwcmVjYXRlZCkuXHJcbi8vIC0gRGVmZW5zaXZlIGVycm9yIG1lc3NhZ2VzIGZvciBjb21tb24gZ2V0VXNlck1lZGlhIGZhaWx1cmVzLlxyXG4vL1xyXG4vLyBJbXBvcnRhbnQgY29uc3RyYWludCAoQ2hyb21lKTogbWljcm9waG9uZSBjYXB0dXJlIHJlcXVpcmVzIGEgU2VjdXJlIENvbnRleHQuXHJcbi8vIC0gQWxsb3dlZDogaHR0cHM6Ly8uLi4gb3IgaHR0cDovL2xvY2FsaG9zdFxyXG4vLyAtIEJsb2NrZWQ6IGh0dHA6Ly9pbnRyYW5ldC1ob3N0ICh1bmxlc3MgY29ycG9yYXRlIHBvbGljeSB0cmVhdHMgb3JpZ2luIGFzIHNlY3VyZSlcclxuXHJcbmNvbnN0IElORF9CUkFORCA9IFwiIzAwMjk2YlwiO1xyXG5jb25zdCBJTkRfQlJBTkRfUkdCID0gWzAsIDQxLCAxMDddOyAvLyAjMDAyOTZiXHJcbmNvbnN0IElORF9BVURJT19XT1JLTEVUX1BBVEggPSBcIi9qcy9pbmQtYXVkaW8td29ya2xldC5qc1wiO1xyXG5jb25zdCBJTkRfQVVESU9fTE9HX1BSRUZJWCA9IFwiW0F1ZGlvUmVjb3JkZXJNaW5pbWFsXVwiO1xyXG5cclxuZnVuY3Rpb24gbG9nSW5mbyguLi5hcmdzKSB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuaW5mbykge1xyXG4gICAgY29uc29sZS5pbmZvKElORF9BVURJT19MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvZ1dhcm4oLi4uYXJncykge1xyXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLndhcm4pIHtcclxuICAgIGNvbnNvbGUud2FybihJTkRfQVVESU9fTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb2dFcnJvciguLi5hcmdzKSB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoSU5EX0FVRElPX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYnJhbmRSZ2JhKGFscGhhKSB7XHJcbiAgcmV0dXJuIGByZ2JhKCR7SU5EX0JSQU5EX1JHQlswXX0sICR7SU5EX0JSQU5EX1JHQlsxXX0sICR7SU5EX0JSQU5EX1JHQlsyXX0sICR7YWxwaGF9KWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhZmVFcnJOYW1lKGVycikge1xyXG4gIHJldHVybiBlcnIgJiYgZXJyLm5hbWUgPyBlcnIubmFtZSA6IFwiXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhZmVFcnJNZXNzYWdlKGVycikge1xyXG4gIHJldHVybiBlcnIgJiYgZXJyLm1lc3NhZ2UgPyBlcnIubWVzc2FnZSA6IFwiXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzU2VjdXJlQ29udGV4dFNhZmUoKSB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB0cnVlO1xyXG4gIHJldHVybiAhIXdpbmRvdy5pc1NlY3VyZUNvbnRleHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldExvY2F0aW9uU2FmZSgpIHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XHJcbiAgaWYgKCF3aW5kb3cubG9jYXRpb24pIHJldHVybiBudWxsO1xyXG4gIHJldHVybiB3aW5kb3cubG9jYXRpb247XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzTG9jYWxob3N0SG9zdChob3N0bmFtZSkge1xyXG4gIHJldHVybiBob3N0bmFtZSA9PT0gXCJsb2NhbGhvc3RcIiB8fCBob3N0bmFtZSA9PT0gXCIxMjcuMC4wLjFcIiB8fCBob3N0bmFtZSA9PT0gXCJbOjoxXVwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0h0dHBJbnRyYW5ldEJsb2NrZWQoKSB7XHJcbiAgY29uc3QgbG9jID0gZ2V0TG9jYXRpb25TYWZlKCk7XHJcbiAgaWYgKCFsb2MpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgY29uc3QgcHJvdG9jb2wgPSBsb2MucHJvdG9jb2wgfHwgXCJcIjtcclxuICBjb25zdCBob3N0bmFtZSA9IGxvYy5ob3N0bmFtZSB8fCBcIlwiO1xyXG5cclxuICBpZiAocHJvdG9jb2wgIT09IFwiaHR0cDpcIikgcmV0dXJuIGZhbHNlO1xyXG4gIGlmIChpc0xvY2FsaG9zdEhvc3QoaG9zdG5hbWUpKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIC8vIGh0dHAgKyBub3QgbG9jYWxob3N0OiBub3JtYWxseSBibG9ja2VkIGZvciBtaWMuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEF1ZGlvV29ya2xldFVybCgpIHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhd2luZG93LmxvY2F0aW9uKSB7XHJcbiAgICByZXR1cm4gSU5EX0FVRElPX1dPUktMRVRfUEFUSDtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gbmV3IFVSTChJTkRfQVVESU9fV09SS0xFVF9QQVRILCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKS50b1N0cmluZygpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIElORF9BVURJT19XT1JLTEVUX1BBVEg7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmb3JtYXRUaW1lTXMobXMpIHtcclxuICAvLyBBbHdheXMgc2hvdyBtbTpzcy4gTWludXRlcyBrZWVwIGluY3JlYXNpbmcgYWZ0ZXIgNTkuXHJcbiAgY29uc3QgdG90YWxTZWNvbmRzID0gTWF0aC5mbG9vcihtcyAvIDEwMDApO1xyXG4gIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDYwKTtcclxuICBjb25zdCBzZWNvbmRzID0gdG90YWxTZWNvbmRzICUgNjA7XHJcblxyXG4gIGNvbnN0IG1tID0gU3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICBjb25zdCBzcyA9IFN0cmluZyhzZWNvbmRzKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcblxyXG4gIHJldHVybiBgJHttbX06JHtzc31gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYW5pdGl6ZUZpbGVOYW1lQmFzZSh2YWx1ZSkge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gIHJldHVybiBTdHJpbmcodmFsdWUpXHJcbiAgICAudHJpbSgpXHJcbiAgICAucmVwbGFjZSgvXFxzKy9nLCBcIi1cIilcclxuICAgIC5yZXBsYWNlKC9bXFxcXC86Kj9cIjw+fF0rL2csIFwiXCIpXHJcbiAgICAucmVwbGFjZSgvLSsvZywgXCItXCIpXHJcbiAgICAucmVwbGFjZSgvXi0rLywgXCJcIilcclxuICAgIC5yZXBsYWNlKC8tKyQvLCBcIlwiKTtcclxufVxyXG5cclxuLy8gQnVpbGQgYSBzYWZlLCB0aW1lc3RhbXBlZCBmaWxlIG5hbWUgZm9yIHRoZSBXQVYgZG93bmxvYWQuXHJcbmZ1bmN0aW9uIGJ1aWxkRG93bmxvYWRGaWxlTmFtZShiYXNlTmFtZSkge1xyXG4gIGNvbnN0IHNhZmVCYXNlID0gc2FuaXRpemVGaWxlTmFtZUJhc2UoYmFzZU5hbWUpO1xyXG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgY29uc3QgcGFkID0gKG4pID0+IFN0cmluZyhuKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgY29uc3Qgc3RhbXAgPSBgJHtub3cuZ2V0RnVsbFllYXIoKX0ke3BhZChub3cuZ2V0TW9udGgoKSArIDEpfSR7cGFkKG5vdy5nZXREYXRlKCkpfS0ke3BhZChub3cuZ2V0SG91cnMoKSl9JHtwYWQobm93LmdldE1pbnV0ZXMoKSl9JHtwYWQobm93LmdldFNlY29uZHMoKSl9YDtcclxuICByZXR1cm4gYCR7c2FmZUJhc2V9LSR7c3RhbXB9LndhdmA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZsb2F0VG8xNkJpdFBDTShmbG9hdDMyQXJyYXkpIHtcclxuICBjb25zdCBvdXQgPSBuZXcgSW50MTZBcnJheShmbG9hdDMyQXJyYXkubGVuZ3RoKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZsb2F0MzJBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgcyA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBmbG9hdDMyQXJyYXlbaV0pKTtcclxuICAgIG91dFtpXSA9IHMgPCAwID8gcyAqIDB4ODAwMCA6IHMgKiAweDdmZmY7XHJcbiAgfVxyXG4gIHJldHVybiBvdXQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVuY29kZVdhdihhcmdzKSB7XHJcbiAgY29uc3Qgc2FtcGxlczE2ID0gYXJncy5zYW1wbGVzMTY7XHJcbiAgY29uc3Qgc2FtcGxlUmF0ZSA9IGFyZ3Muc2FtcGxlUmF0ZTtcclxuICBjb25zdCBudW1DaGFubmVscyA9IGFyZ3MubnVtQ2hhbm5lbHM7XHJcblxyXG4gIGNvbnN0IGJ5dGVzUGVyU2FtcGxlID0gMjtcclxuICBjb25zdCBibG9ja0FsaWduID0gbnVtQ2hhbm5lbHMgKiBieXRlc1BlclNhbXBsZTtcclxuICBjb25zdCBieXRlUmF0ZSA9IHNhbXBsZVJhdGUgKiBibG9ja0FsaWduO1xyXG4gIGNvbnN0IGRhdGFTaXplID0gc2FtcGxlczE2Lmxlbmd0aCAqIGJ5dGVzUGVyU2FtcGxlO1xyXG5cclxuICBjb25zdCBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoNDQgKyBkYXRhU2l6ZSk7XHJcbiAgY29uc3QgdmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIpO1xyXG5cclxuICBsZXQgb2Zmc2V0ID0gMDtcclxuICBmdW5jdGlvbiB3cml0ZVN0cmluZyhzKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHMubGVuZ3RoOyBpKyspIHZpZXcuc2V0VWludDgob2Zmc2V0ICsgaSwgcy5jaGFyQ29kZUF0KGkpKTtcclxuICAgIG9mZnNldCArPSBzLmxlbmd0aDtcclxuICB9XHJcbiAgZnVuY3Rpb24gd3JpdGVVaW50MzIodikge1xyXG4gICAgdmlldy5zZXRVaW50MzIob2Zmc2V0LCB2LCB0cnVlKTtcclxuICAgIG9mZnNldCArPSA0O1xyXG4gIH1cclxuICBmdW5jdGlvbiB3cml0ZVVpbnQxNih2KSB7XHJcbiAgICB2aWV3LnNldFVpbnQxNihvZmZzZXQsIHYsIHRydWUpO1xyXG4gICAgb2Zmc2V0ICs9IDI7XHJcbiAgfVxyXG5cclxuICB3cml0ZVN0cmluZyhcIlJJRkZcIik7XHJcbiAgd3JpdGVVaW50MzIoMzYgKyBkYXRhU2l6ZSk7XHJcbiAgd3JpdGVTdHJpbmcoXCJXQVZFXCIpO1xyXG5cclxuICB3cml0ZVN0cmluZyhcImZtdCBcIik7XHJcbiAgd3JpdGVVaW50MzIoMTYpO1xyXG4gIHdyaXRlVWludDE2KDEpO1xyXG4gIHdyaXRlVWludDE2KG51bUNoYW5uZWxzKTtcclxuICB3cml0ZVVpbnQzMihzYW1wbGVSYXRlKTtcclxuICB3cml0ZVVpbnQzMihieXRlUmF0ZSk7XHJcbiAgd3JpdGVVaW50MTYoYmxvY2tBbGlnbik7XHJcbiAgd3JpdGVVaW50MTYoMTYpO1xyXG5cclxuICB3cml0ZVN0cmluZyhcImRhdGFcIik7XHJcbiAgd3JpdGVVaW50MzIoZGF0YVNpemUpO1xyXG5cclxuICBmb3IgKGxldCBqID0gMDsgaiA8IHNhbXBsZXMxNi5sZW5ndGg7IGorKywgb2Zmc2V0ICs9IDIpIHtcclxuICAgIHZpZXcuc2V0SW50MTYob2Zmc2V0LCBzYW1wbGVzMTZbal0sIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5ldyBCbG9iKFtidWZmZXJdLCB7IHR5cGU6IFwiYXVkaW8vd2F2XCIgfSk7XHJcbn1cclxuXHJcbi8vIENvbnZlcnQgUENNIGZsb2F0IHNhbXBsZXMgaW50byBwZXItc2Vjb25kIGxldmVscyBmb3Igd2F2ZWZvcm0gZGlzcGxheS5cclxuZnVuY3Rpb24gYnVpbGRTZWNvbmRMZXZlbHMoc2FtcGxlcywgc2FtcGxlUmF0ZSkge1xyXG4gIGlmICghc2FtcGxlcyB8fCAhc2FtcGxlcy5sZW5ndGggfHwgIXNhbXBsZVJhdGUpIHJldHVybiBbXTtcclxuXHJcbiAgY29uc3Qgc2Vjb25kcyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbChzYW1wbGVzLmxlbmd0aCAvIHNhbXBsZVJhdGUpKTtcclxuICBjb25zdCBsZXZlbHMgPSBuZXcgQXJyYXkoc2Vjb25kcykuZmlsbCgwKTtcclxuICBsZXQgbWF4ID0gMDtcclxuXHJcbiAgZm9yIChsZXQgcyA9IDA7IHMgPCBzZWNvbmRzOyBzKyspIHtcclxuICAgIGNvbnN0IHN0YXJ0ID0gcyAqIHNhbXBsZVJhdGU7XHJcbiAgICBjb25zdCBlbmQgPSBNYXRoLm1pbigocyArIDEpICogc2FtcGxlUmF0ZSwgc2FtcGxlcy5sZW5ndGgpO1xyXG4gICAgbGV0IHN1bSA9IDA7XHJcbiAgICBjb25zdCBsZW4gPSBlbmQgLSBzdGFydDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xyXG4gICAgICBjb25zdCB2ID0gc2FtcGxlc1tpXTtcclxuICAgICAgc3VtICs9IHYgKiB2O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJtcyA9IE1hdGguc3FydChzdW0gLyBNYXRoLm1heCgxLCBsZW4pKTtcclxuICAgIGxldmVsc1tzXSA9IHJtcztcclxuICAgIGlmIChybXMgPiBtYXgpIG1heCA9IHJtcztcclxuICB9XHJcblxyXG4gIGlmIChtYXggPD0gMCkgcmV0dXJuIGxldmVscztcclxuXHJcbiAgcmV0dXJuIGxldmVscy5tYXAoKHYpID0+IE1hdGgubWluKDEsIE1hdGgucG93KHYgLyBtYXgsIDAuNzUpKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdSb3VuZGVkUmVjdChjdHgsIHgsIHksIHcsIGgsIHIpIHtcclxuICBpZiAoY3R4LnJvdW5kUmVjdCkge1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LnJvdW5kUmVjdCh4LCB5LCB3LCBoLCByKTtcclxuICAgIGN0eC5maWxsKCk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjdHguZmlsbFJlY3QoeCwgeSwgdywgaCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkSHR0cE1pY0Jsb2NrZWRNZXNzYWdlKCkge1xyXG4gIHJldHVybiBpbmRUKFxyXG4gICAgXCJBdWRpb1JlY29yZGVyX0Vycm9yX0h0dHBCbG9ja2VkXCIsXHJcbiAgICBcIkNocm9tZSBibG9ja3MgbWljcm9waG9uZSBvbiBIVFRQIChpbnRyYW5ldCkuIFVzZSBIVFRQUyBvciBvcGVuIHRoZSBhcHAgdmlhIGh0dHA6Ly9sb2NhbGhvc3QuIEZvciBkZXYsIGNvbmZpZ3VyZSBDaHJvbWUgdG8gdHJlYXQgeW91ciBIVFRQIG9yaWdpbiBhcyBzZWN1cmUuXCJcclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBidWlsZE1pY0Vycm9yTWVzc2FnZShlcnIpIHtcclxuICBjb25zdCBuYW1lID0gc2FmZUVyck5hbWUoZXJyKTtcclxuXHJcbiAgaWYgKGlzSHR0cEludHJhbmV0QmxvY2tlZCgpICYmICFpc1NlY3VyZUNvbnRleHRTYWZlKCkpIHtcclxuICAgIHJldHVybiBidWlsZEh0dHBNaWNCbG9ja2VkTWVzc2FnZSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG5hbWUgPT09IFwiTm90QWxsb3dlZEVycm9yXCIgfHwgbmFtZSA9PT0gXCJQZXJtaXNzaW9uRGVuaWVkRXJyb3JcIikge1xyXG4gICAgcmV0dXJuIGluZFQoXHJcbiAgICAgIFwiQXVkaW9SZWNvcmRlcl9FcnJvcl9QZXJtaXNzaW9uRGVuaWVkXCIsXHJcbiAgICAgIFwiTWljcm9waG9uZSBwZXJtaXNzaW9uIGRlbmllZC4gQWxsb3cgaXQgaW4gdGhlIGJyb3dzZXIgYW5kIHJlbG9hZCB0aGUgcGFnZS5cIlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmIChuYW1lID09PSBcIk5vdEZvdW5kRXJyb3JcIiB8fCBuYW1lID09PSBcIkRldmljZXNOb3RGb3VuZEVycm9yXCIpIHtcclxuICAgIHJldHVybiBpbmRUKFwiQXVkaW9SZWNvcmRlcl9FcnJvcl9Ob0RldmljZVwiLCBcIk5vIG1pY3JvcGhvbmUgZGV2aWNlIGZvdW5kLiBDb25uZWN0IG9uZSBhbmQgdHJ5IGFnYWluLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChuYW1lID09PSBcIk5vdFJlYWRhYmxlRXJyb3JcIiB8fCBuYW1lID09PSBcIlRyYWNrU3RhcnRFcnJvclwiKSB7XHJcbiAgICByZXR1cm4gaW5kVChcclxuICAgICAgXCJBdWRpb1JlY29yZGVyX0Vycm9yX0RldmljZUJ1c3lcIixcclxuICAgICAgXCJUaGUgbWljcm9waG9uZSBpcyBidXN5IG9yIGNvdWxkIG5vdCBzdGFydC4gQ2xvc2Ugb3RoZXIgYXBwcyAoVGVhbXMsIFpvb20pIGFuZCB0cnkgYWdhaW4uXCJcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBpZiAobmFtZSA9PT0gXCJTZWN1cml0eUVycm9yXCIpIHtcclxuICAgIHJldHVybiBpbmRUKFxyXG4gICAgICBcIkF1ZGlvUmVjb3JkZXJfRXJyb3JfU2VjdXJpdHlcIixcclxuICAgICAgXCJCbG9ja2VkIGJ5IGJyb3dzZXIgc2VjdXJpdHkuIEluIENocm9tZSwgdXNlIEhUVFBTIG9yIGNvcnBvcmF0ZSBwb2xpY3kgdG8gYWxsb3cgdGhlIG1pYyBvbiBpbnRyYW5ldC5cIlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmIChuYW1lID09PSBcIk92ZXJjb25zdHJhaW5lZEVycm9yXCIgfHwgbmFtZSA9PT0gXCJDb25zdHJhaW50Tm90U2F0aXNmaWVkRXJyb3JcIikge1xyXG4gICAgcmV0dXJuIGluZFQoXHJcbiAgICAgIFwiQXVkaW9SZWNvcmRlcl9FcnJvcl9Db25zdHJhaW50c1wiLFxyXG4gICAgICBcIkF1ZGlvIGNvbnN0cmFpbnRzIGNvdWxkIG5vdCBiZSBzYXRpc2ZpZWQuIFRyeSBhbm90aGVyIG1pY3JvcGhvbmUgb3IgY29uZmlndXJhdGlvbi5cIlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBpbmRUKFxyXG4gICAgXCJBdWRpb1JlY29yZGVyX0Vycm9yX0dlbmVyaWNcIixcclxuICAgIFwiQ291bGQgbm90IHN0YXJ0IHJlY29yZGluZy4gQ2hlY2sgbWljcm9waG9uZSBwZXJtaXNzaW9ucy4gSW4gQ2hyb21lLCBpdCB1c3VhbGx5IHJlcXVpcmVzIEhUVFBTIG9yIGxvY2FsaG9zdC5cIlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIFNlbGYtdGVzdHMgZm9yIHB1cmUgZnVuY3Rpb25zLlxyXG4vLyBFbmFibGUgYnkgc2V0dGluZzogd2luZG93Ll9fSU5EX0FVRElPX1JFQ09SREVSX1RFU1RTX18gPSB0cnVlXHJcbmZ1bmN0aW9uIHJ1blNlbGZUZXN0cygpIHtcclxuICB0cnkge1xyXG4gICAgY29uc29sZS5hc3NlcnQoZm9ybWF0VGltZU1zKDApID09PSBcIjAwOjAwXCIsIFwiZm9ybWF0VGltZU1zKDApIHNob3VsZCBiZSAwMDowMFwiKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KGZvcm1hdFRpbWVNcyg2MV8wMDApID09PSBcIjAxOjAxXCIsIFwiZm9ybWF0VGltZU1zKDYxMDAwKSBzaG91bGQgYmUgMDE6MDFcIik7XHJcbiAgICBjb25zb2xlLmFzc2VydChmb3JtYXRUaW1lTXMoM182NjFfMDAwKSA9PT0gXCI2MTowMVwiLCBcImZvcm1hdFRpbWVNcygzNjYxMDAwKSBzaG91bGQgYmUgNjE6MDFcIik7XHJcbiAgICBjb25zb2xlLmFzc2VydChmb3JtYXRUaW1lTXMoM182MDBfMDAwKSA9PT0gXCI2MDowMFwiLCBcImZvcm1hdFRpbWVNcygzNjAwMDAwKSBzaG91bGQgYmUgNjA6MDBcIik7XHJcbiAgICBjb25zb2xlLmFzc2VydChmb3JtYXRUaW1lTXMoNTlfMDAwKSA9PT0gXCIwMDo1OVwiLCBcImZvcm1hdFRpbWVNcyg1OTAwMCkgc2hvdWxkIGJlIDAwOjU5XCIpO1xyXG4gICAgY29uc29sZS5hc3NlcnQoZm9ybWF0VGltZU1zKDYwXzAwMCkgPT09IFwiMDE6MDBcIiwgXCJmb3JtYXRUaW1lTXMoNjAwMDApIHNob3VsZCBiZSAwMTowMFwiKTtcclxuXHJcbiAgICBjb25zdCBmID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMSwgLTEsIDAuNSwgLTAuNV0pO1xyXG4gICAgY29uc3QgcGNtID0gZmxvYXRUbzE2Qml0UENNKGYpO1xyXG4gICAgY29uc29sZS5hc3NlcnQocGNtLmxlbmd0aCA9PT0gNSwgXCJQQ00gbGVuZ3RoIHNob3VsZCBtYXRjaCBpbnB1dFwiKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KHBjbVsxXSA9PT0gMzI3NjcsIFwiMS4wIHNob3VsZCBtYXAgdG8gMzI3NjdcIik7XHJcbiAgICBjb25zb2xlLmFzc2VydChwY21bMl0gPT09IC0zMjc2OCwgXCItMS4wIHNob3VsZCBtYXAgdG8gLTMyNzY4XCIpO1xyXG5cclxuICAgIGNvbnN0IHdhdiA9IGVuY29kZVdhdih7IHNhbXBsZXMxNjogbmV3IEludDE2QXJyYXkoWzAsIDEsIC0xXSksIHNhbXBsZVJhdGU6IDQ4MDAwLCBudW1DaGFubmVsczogMSB9KTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KHdhdiAmJiB3YXYudHlwZSA9PT0gXCJhdWRpby93YXZcIiwgXCJXQVYgYmxvYiBzaG91bGQgYmUgYXVkaW8vd2F2XCIpO1xyXG5cclxuICAgIGNvbnNvbGUuYXNzZXJ0KGJyYW5kUmdiYSgwLjUpLnN0YXJ0c1dpdGgoXCJyZ2JhKFwiKSwgXCJicmFuZFJnYmEgc2hvdWxkIHJldHVybiByZ2JhKC4uLilcIik7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJBdWRpb1JlY29yZGVyTWluaW1hbCBzZWxmLXRlc3RzOiBPS1wiKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiQXVkaW9SZWNvcmRlck1pbmltYWwgc2VsZi10ZXN0czogRkFJTEVEXCIsIGUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXVkaW9SZWNvcmRlck1pbmltYWwoe1xyXG4gIGVtYmVkZGVkID0gZmFsc2UsXHJcbiAgb25BdWRpb1JlYWR5LFxyXG4gIG9uQXVkaW9DbGVhcmVkLFxyXG4gIG9uVHJhbnNjcmliZSxcclxuICB0cmFuc2NyaWJlQnVzeSA9IGZhbHNlLFxyXG4gIHRyYW5zY3JpYmVMYWJlbCxcclxuICB0cmFuc2NyaWJlQnVzeUxhYmVsLFxyXG4gIG9uUmVjb3JkaW5nRXJyb3IsXHJcbn06IEF1ZGlvUmVjb3JkZXJQcm9wcykge1xyXG4gIGNvbnN0IFtjYW5SZWNvcmQsIHNldENhblJlY29yZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3VpRXJyb3IsIHNldFVpRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3VpSGludCwgc2V0VWlIaW50XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCBbaXNSZWNvcmRpbmcsIHNldElzUmVjb3JkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbaXNQYXVzZWQsIHNldElzUGF1c2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbaXNQbGF5aW5nLCBzZXRJc1BsYXlpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICBjb25zdCBbZWxhcHNlZE1zLCBzZXRFbGFwc2VkTXNdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW3dhdkJsb2IsIHNldFdhdkJsb2JdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW3dhdlVybCwgc2V0V2F2VXJsXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFt3YXZGaWxlTmFtZSwgc2V0V2F2RmlsZU5hbWVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3dhdkxldmVscywgc2V0V2F2TGV2ZWxzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbd2F2RHVyYXRpb25TZWMsIHNldFdhdkR1cmF0aW9uU2VjXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtwbGF5YmFja1JlbWFpbmluZ1NlYywgc2V0UGxheWJhY2tSZW1haW5pbmdTZWNdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW3BsYXliYWNrU2Vjb25kLCBzZXRQbGF5YmFja1NlY29uZF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCB3YXZVcmxSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3Qgd2F2TGV2ZWxzUmVmID0gdXNlUmVmKFtdKTtcclxuXHJcbiAgY29uc3QgYXVkaW9FbFJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBpc01vdW50ZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG5cclxuICBjb25zdCBzdHJlYW1SZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgYXVkaW9DdHhSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3Qgc291cmNlUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IGFuYWx5c2VyUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IHByb2Nlc3NvclJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCB6ZXJvR2FpblJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCB3b3JrbGV0Tm9kZVJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgY29uc3Qgc2FtcGxlUmF0ZVJlZiA9IHVzZVJlZig0ODAwMCk7XHJcbiAgY29uc3QgY2h1bmtzUmVmID0gdXNlUmVmKFtdKTtcclxuXHJcbiAgY29uc3Qgc3RhcnRlZEF0UmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IGFjY3VtdWxhdGVkTXNSZWYgPSB1c2VSZWYoMCk7XHJcbiAgY29uc3QgdGltZXJJZFJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgY29uc3QgcmFmSWRSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgYmFyc0NhbnZhc1JlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgY29uc3QgYmFyV2lkdGhQeCA9IDI7XHJcbiAgY29uc3QgYmFyR2FwUHggPSAyO1xyXG4gIGNvbnN0IGJhck1pbkNvdW50ID0gNDg7XHJcbiAgY29uc3QgYmFyTWF4Q291bnQgPSAxMjA7XHJcblxyXG4gIGNvbnN0IGVxTGFzdFJlZiA9IHVzZVJlZihbXSk7XHJcblxyXG4gIGNvbnN0IGlzUmVjb3JkaW5nUmVmID0gdXNlUmVmKGZhbHNlKTtcclxuICBjb25zdCBpc1BhdXNlZFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGRvd25sb2FkTGFiZWwgPSBpbmRUKFwiQXVkaW9SZWNvcmRlcl9Eb3dubG9hZFwiKTtcclxuICBjb25zdCBkb3dubG9hZEJhc2VOYW1lID0gaW5kVChcIkF1ZGlvUmVjb3JkZXJfRG93bmxvYWRfRmlsZU5hbWVcIik7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpc01vdW50ZWRSZWYuY3VycmVudCA9IHRydWU7XHJcblxyXG4gICAgY29uc3Qgb2sgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmICEhKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiYgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpO1xyXG4gICAgc2V0Q2FuUmVjb3JkKG9rKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuX19JTkRfQVVESU9fUkVDT1JERVJfVEVTVFNfXyA9PT0gdHJ1ZSkge1xyXG4gICAgICBydW5TZWxmVGVzdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICBpZiAoaXNIdHRwSW50cmFuZXRCbG9ja2VkKCkgJiYgIWlzU2VjdXJlQ29udGV4dFNhZmUoKSkge1xyXG4gICAgICAgIHNldFVpRXJyb3IoYnVpbGRIdHRwTWljQmxvY2tlZE1lc3NhZ2UoKSk7XHJcbiAgICAgICAgY29uc3QgbG9jID0gZ2V0TG9jYXRpb25TYWZlKCk7XHJcbiAgICAgICAgaWYgKGxvYykgc2V0VWlIaW50KGluZFQoXCJBdWRpb1JlY29yZGVyX0hpbnRfT3JpZ2luXCIsIFwiQ3VycmVudCBvcmlnaW46IHswfVwiKS5yZXBsYWNlKFwiezB9XCIsIGxvYy5vcmlnaW4pKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN5bmNDYW52YXNTaXplKCk7XHJcbiAgICBkcmF3RXFJZGxlKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gb25SZXNpemUoKSB7XHJcbiAgICAgIHN5bmNDYW52YXNTaXplKCk7XHJcbiAgICAgIGRyYXdFcUlkbGUoKTtcclxuICAgIH1cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG9uUmVzaXplKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpc01vdW50ZWRSZWYuY3VycmVudCA9IGZhbHNlO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBvblJlc2l6ZSk7XHJcblxyXG4gICAgICBzYWZlU3RvcFBsYXliYWNrKCk7XHJcbiAgICAgIHNhZmVTdG9wUmVjb3JkaW5nSW50ZXJuYWwoeyBrZWVwV2F2OiB0cnVlLCBza2lwVWlTdGF0ZTogdHJ1ZSB9KTtcclxuICAgICAgaWYgKHdhdlVybFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwod2F2VXJsUmVmLmN1cnJlbnQpO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlzUmVjb3JkaW5nUmVmLmN1cnJlbnQgPSBpc1JlY29yZGluZztcclxuICB9LCBbaXNSZWNvcmRpbmddKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlzUGF1c2VkUmVmLmN1cnJlbnQgPSBpc1BhdXNlZDtcclxuICB9LCBbaXNQYXVzZWRdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHdhdlVybFJlZi5jdXJyZW50ID0gd2F2VXJsO1xyXG4gIH0sIFt3YXZVcmxdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHdhdkxldmVsc1JlZi5jdXJyZW50ID0gd2F2TGV2ZWxzO1xyXG4gIH0sIFt3YXZMZXZlbHNdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGF1ZGlvRWwgPSBhdWRpb0VsUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWF1ZGlvRWwpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgZnVuY3Rpb24gb25FbmRlZCgpIHtcclxuICAgICAgc2V0SXNQbGF5aW5nKGZhbHNlKTtcclxuICAgICAgaWYgKHdhdkR1cmF0aW9uU2VjID4gMCkge1xyXG4gICAgICAgIHNldFBsYXliYWNrUmVtYWluaW5nU2VjKHdhdkR1cmF0aW9uU2VjKTtcclxuICAgICAgICBzZXRQbGF5YmFja1NlY29uZCgwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gb25QYXVzZSgpIHtcclxuICAgICAgc2V0SXNQbGF5aW5nKGZhbHNlKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG9uUGxheSgpIHtcclxuICAgICAgc2V0SXNQbGF5aW5nKHRydWUpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gb25Mb2FkZWRNZXRhZGF0YSgpIHtcclxuICAgICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLmNlaWwoYXVkaW9FbC5kdXJhdGlvbiB8fCAwKTtcclxuICAgICAgaWYgKGR1cmF0aW9uID4gMCkge1xyXG4gICAgICAgIHNldFdhdkR1cmF0aW9uU2VjKGR1cmF0aW9uKTtcclxuICAgICAgICBzZXRQbGF5YmFja1JlbWFpbmluZ1NlYyhkdXJhdGlvbik7XHJcbiAgICAgICAgc2V0UGxheWJhY2tTZWNvbmQoMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG9uVGltZVVwZGF0ZSgpIHtcclxuICAgICAgY29uc3QgdG90YWwgPSB3YXZEdXJhdGlvblNlYyA+IDAgPyB3YXZEdXJhdGlvblNlYyA6IE1hdGguY2VpbChhdWRpb0VsLmR1cmF0aW9uIHx8IDApO1xyXG4gICAgICBpZiAodG90YWwgPD0gMCkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBjdXJyZW50ID0gYXVkaW9FbC5jdXJyZW50VGltZSB8fCAwO1xyXG4gICAgICBjb25zdCByZW1haW5pbmcgPSBNYXRoLm1heCgwLCB0b3RhbCAtIGN1cnJlbnQpO1xyXG4gICAgICBzZXRQbGF5YmFja1JlbWFpbmluZ1NlYyhyZW1haW5pbmcpO1xyXG4gICAgICBzZXRQbGF5YmFja1NlY29uZChNYXRoLm1heCgwLCBNYXRoLm1pbih0b3RhbCAtIDEsIE1hdGguZmxvb3IoY3VycmVudCkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXVkaW9FbC5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwgb25FbmRlZCk7XHJcbiAgICBhdWRpb0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJwYXVzZVwiLCBvblBhdXNlKTtcclxuICAgIGF1ZGlvRWwuYWRkRXZlbnRMaXN0ZW5lcihcInBsYXlcIiwgb25QbGF5KTtcclxuICAgIGF1ZGlvRWwuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZG1ldGFkYXRhXCIsIG9uTG9hZGVkTWV0YWRhdGEpO1xyXG4gICAgYXVkaW9FbC5hZGRFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBvblRpbWVVcGRhdGUpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGF1ZGlvRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsIG9uRW5kZWQpO1xyXG4gICAgICBhdWRpb0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYXVzZVwiLCBvblBhdXNlKTtcclxuICAgICAgYXVkaW9FbC5yZW1vdmVFdmVudExpc3RlbmVyKFwicGxheVwiLCBvblBsYXkpO1xyXG4gICAgICBhdWRpb0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkZWRtZXRhZGF0YVwiLCBvbkxvYWRlZE1ldGFkYXRhKTtcclxuICAgICAgYXVkaW9FbC5yZW1vdmVFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBvblRpbWVVcGRhdGUpO1xyXG4gICAgfTtcclxuICB9LCBbd2F2RHVyYXRpb25TZWNdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChpc1JlY29yZGluZyAmJiAhaXNQYXVzZWQpIHtcclxuICAgICAgc3RhcnRFcUxvb3AoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0b3BFcUxvb3AoKTtcclxuICAgICAgaWYgKHdhdkxldmVsc1JlZi5jdXJyZW50ICYmIHdhdkxldmVsc1JlZi5jdXJyZW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBkcmF3RXFXYXZlZm9ybShwbGF5YmFja1NlY29uZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZHJhd0VxSWRsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSwgW2lzUmVjb3JkaW5nLCBpc1BhdXNlZF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc1JlY29yZGluZyAmJiB3YXZMZXZlbHNSZWYuY3VycmVudCAmJiB3YXZMZXZlbHNSZWYuY3VycmVudC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGRyYXdFcVdhdmVmb3JtKHBsYXliYWNrU2Vjb25kKTtcclxuICAgIH1cclxuICB9LCBbcGxheWJhY2tTZWNvbmQsIHdhdkxldmVscywgaXNSZWNvcmRpbmddKTtcclxuXHJcbiAgZnVuY3Rpb24gc2FmZVNldFN0YXRlKGZuKSB7XHJcbiAgICBpZiAoIWlzTW91bnRlZFJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICBmbigpO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgbm90aWZ5UmVjb3JkaW5nRXJyb3IgPSAobWVzc2FnZTogc3RyaW5nKSA9PiB7XHJcbiAgICAvLyBOb3RpZnkgcGFyZW50IHNvIGl0IGNhbiBzdXJmYWNlIGEgd2FybmluZyBhbmQgY2xvc2UgdGhlIHJlY29yZGVyLlxyXG4gICAgaWYgKHR5cGVvZiBvblJlY29yZGluZ0Vycm9yICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybjtcclxuICAgIHRyeSB7XHJcbiAgICAgIG9uUmVjb3JkaW5nRXJyb3IobWVzc2FnZSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gc2FmZVN0b3BQbGF5YmFjaygpIHtcclxuICAgIGNvbnN0IGF1ZGlvRWwgPSBhdWRpb0VsUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWF1ZGlvRWwpIHJldHVybjtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBhdWRpb0VsLnBhdXNlKCk7XHJcbiAgICAgIGF1ZGlvRWwuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgfVxyXG5cclxuICAgIHNhZmVTZXRTdGF0ZSgoKSA9PiB7XHJcbiAgICAgIHNldElzUGxheWluZyhmYWxzZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHN0YXJ0VGltZXIoKSB7XHJcbiAgICBpZiAodGltZXJJZFJlZi5jdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgc3RhcnRlZEF0UmVmLmN1cnJlbnQgPSBEYXRlLm5vdygpO1xyXG4gICAgdGltZXJJZFJlZi5jdXJyZW50ID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgaWYgKCFzdGFydGVkQXRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICBjb25zdCBjdXJyZW50ID0gYWNjdW11bGF0ZWRNc1JlZi5jdXJyZW50ICsgKG5vdyAtIHN0YXJ0ZWRBdFJlZi5jdXJyZW50KTtcclxuICAgICAgc2FmZVNldFN0YXRlKCgpID0+IHtcclxuICAgICAgICBzZXRFbGFwc2VkTXMoY3VycmVudCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgMjAwKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBhdXNlVGltZXIoKSB7XHJcbiAgICBpZiAoIXN0YXJ0ZWRBdFJlZi5jdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcclxuICAgIGFjY3VtdWxhdGVkTXNSZWYuY3VycmVudCA9IGFjY3VtdWxhdGVkTXNSZWYuY3VycmVudCArIChub3cgLSBzdGFydGVkQXRSZWYuY3VycmVudCk7XHJcbiAgICBzdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHRpbWVySWRSZWYuY3VycmVudCkge1xyXG4gICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aW1lcklkUmVmLmN1cnJlbnQpO1xyXG4gICAgICB0aW1lcklkUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXRUaW1lcigpIHtcclxuICAgIGFjY3VtdWxhdGVkTXNSZWYuY3VycmVudCA9IDA7XHJcbiAgICBzdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBpZiAodGltZXJJZFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRpbWVySWRSZWYuY3VycmVudCk7XHJcbiAgICAgIHRpbWVySWRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzYWZlU2V0U3RhdGUoKCkgPT4ge1xyXG4gICAgICBzZXRFbGFwc2VkTXMoMCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIHN0YXJ0UmVjb3JkaW5nKCkge1xyXG4gICAgaWYgKCFjYW5SZWNvcmQpIHtcclxuICAgICAgbG9nV2FybihcImdldFVzZXJNZWRpYSBub3QgYXZhaWxhYmxlIG9yIGJsb2NrZWQuXCIpO1xyXG4gICAgICBjb25zdCBsb2MgPSBnZXRMb2NhdGlvblNhZmUoKTtcclxuICAgICAgY29uc3QgYmxvY2tlZCA9IGlzSHR0cEludHJhbmV0QmxvY2tlZCgpICYmICFpc1NlY3VyZUNvbnRleHRTYWZlKCk7XHJcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGJsb2NrZWRcclxuICAgICAgICA/IGJ1aWxkSHR0cE1pY0Jsb2NrZWRNZXNzYWdlKClcclxuICAgICAgICA6IGluZFQoXCJBdWRpb1JlY29yZGVyX0Vycm9yX1Vuc3VwcG9ydGVkXCIsIFwiWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgZ2V0VXNlck1lZGlhLlwiKTtcclxuICAgICAgY29uc3QgaGludE1lc3NhZ2UgPVxyXG4gICAgICAgIGJsb2NrZWQgJiYgbG9jID8gaW5kVChcIkF1ZGlvUmVjb3JkZXJfSGludF9PcmlnaW5cIiwgXCJDdXJyZW50IG9yaWdpbjogezB9XCIpLnJlcGxhY2UoXCJ7MH1cIiwgbG9jLm9yaWdpbikgOiBcIlwiO1xyXG4gICAgICBzYWZlU2V0U3RhdGUoKCkgPT4ge1xyXG4gICAgICAgIHNldFVpRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICBzZXRVaUhpbnQoaGludE1lc3NhZ2UpO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKGVycm9yTWVzc2FnZSkge1xyXG4gICAgICAgIG5vdGlmeVJlY29yZGluZ0Vycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNhZmVTdG9wUGxheWJhY2soKTtcclxuICAgIHNhZmVTZXRTdGF0ZSgoKSA9PiB7XHJcbiAgICAgIHNldFVpRXJyb3IoXCJcIik7XHJcbiAgICAgIHNldFVpSGludChcIlwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNhZmVTdG9wUmVjb3JkaW5nSW50ZXJuYWwoeyBrZWVwV2F2OiB0cnVlLCBza2lwVWlTdGF0ZTogdHJ1ZSB9KTtcclxuXHJcbiAgICBpZiAod2F2VXJsUmVmLmN1cnJlbnQpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHdhdlVybFJlZi5jdXJyZW50KTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHNhZmVTZXRTdGF0ZSgoKSA9PiB7XHJcbiAgICAgIHNldFdhdlVybChudWxsKTtcclxuICAgICAgc2V0V2F2QmxvYihudWxsKTtcclxuICAgICAgc2V0V2F2RmlsZU5hbWUoXCJcIik7XHJcbiAgICB9KTtcclxuICAgIHNldFdhdkxldmVscyhbXSk7XHJcbiAgICBzZXRXYXZEdXJhdGlvblNlYygwKTtcclxuICAgIHNldFBsYXliYWNrUmVtYWluaW5nU2VjKDApO1xyXG4gICAgc2V0UGxheWJhY2tTZWNvbmQoMCk7XHJcbiAgICBpZiAodHlwZW9mIG9uQXVkaW9DbGVhcmVkID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBvbkF1ZGlvQ2xlYXJlZCgpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICAvKiBpZ25vcmUgKi9cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNodW5rc1JlZi5jdXJyZW50ID0gW107XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gUHJlZmVyIHJhdyBtb25vIGNhcHR1cmUgYW5kIGRpc2FibGUgYnJvd3NlciBwcm9jZXNzaW5nIHdoZW4gYXZhaWxhYmxlLlxyXG4gICAgICBjb25zdCBwcmVmZXJyZWRDb25zdHJhaW50cyA9IHtcclxuICAgICAgICBjaGFubmVsQ291bnQ6IDEsXHJcbiAgICAgICAgZWNob0NhbmNlbGxhdGlvbjogZmFsc2UsXHJcbiAgICAgICAgbm9pc2VTdXBwcmVzc2lvbjogZmFsc2UsXHJcbiAgICAgICAgYXV0b0dhaW5Db250cm9sOiBmYWxzZSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxldCBzdHJlYW0gPSBudWxsO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHsgYXVkaW86IHByZWZlcnJlZENvbnN0cmFpbnRzIH0pO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBsb2dXYXJuKFwiUHJlZmVycmVkIGF1ZGlvIGNvbnN0cmFpbnRzIGZhaWxlZC4gUmV0cnlpbmcgd2l0aCBkZWZhdWx0cy5cIiwgZXJyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFzdHJlYW0pIHtcclxuICAgICAgICBzdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzdHJlYW1SZWYuY3VycmVudCA9IHN0cmVhbTtcclxuXHJcbiAgICAgIGNvbnN0IEF1ZGlvQ29udGV4dEN0b3IgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XHJcbiAgICAgIGlmICghQXVkaW9Db250ZXh0Q3RvcikgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJBdWRpb1JlY29yZGVyX0Vycm9yX05vQXVkaW9Db250ZXh0XCIsIFwiQXVkaW9Db250ZXh0IGlzIG5vdCBhdmFpbGFibGUuXCIpKTtcclxuXHJcbiAgICAgIGNvbnN0IGF1ZGlvQ3R4ID0gbmV3IEF1ZGlvQ29udGV4dEN0b3IoKTtcclxuICAgICAgYXVkaW9DdHhSZWYuY3VycmVudCA9IGF1ZGlvQ3R4O1xyXG4gICAgICBzYW1wbGVSYXRlUmVmLmN1cnJlbnQgPSBhdWRpb0N0eC5zYW1wbGVSYXRlO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBhdWRpb0N0eC5yZXN1bWUoKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHNvdXJjZSA9IGF1ZGlvQ3R4LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XHJcbiAgICAgIHNvdXJjZVJlZi5jdXJyZW50ID0gc291cmNlO1xyXG5cclxuICAgICAgY29uc3QgYW5hbHlzZXIgPSBhdWRpb0N0eC5jcmVhdGVBbmFseXNlcigpO1xyXG4gICAgICBhbmFseXNlci5mZnRTaXplID0gMjA0ODtcclxuICAgICAgYW5hbHlzZXIuc21vb3RoaW5nVGltZUNvbnN0YW50ID0gMC44ODtcclxuICAgICAgYW5hbHlzZXJSZWYuY3VycmVudCA9IGFuYWx5c2VyO1xyXG5cclxuICAgICAgY29uc3QgemVyb0dhaW4gPSBhdWRpb0N0eC5jcmVhdGVHYWluKCk7XHJcbiAgICAgIHplcm9HYWluLmdhaW4udmFsdWUgPSAwO1xyXG4gICAgICB6ZXJvR2FpblJlZi5jdXJyZW50ID0gemVyb0dhaW47XHJcblxyXG4gICAgICB3b3JrbGV0Tm9kZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcHJvY2Vzc29yUmVmLmN1cnJlbnQgPSBudWxsO1xyXG5cclxuICAgICAgbGV0IGNhcHR1cmVOb2RlID0gbnVsbDtcclxuICAgICAgY29uc3QgY2FuV29ya2xldCA9ICEhKGF1ZGlvQ3R4LmF1ZGlvV29ya2xldCAmJiB0eXBlb2YgYXVkaW9DdHguYXVkaW9Xb3JrbGV0LmFkZE1vZHVsZSA9PT0gXCJmdW5jdGlvblwiKTtcclxuICAgICAgaWYgKGNhbldvcmtsZXQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3Qgd29ya2xldFVybCA9IGdldEF1ZGlvV29ya2xldFVybCgpO1xyXG4gICAgICAgICAgYXdhaXQgYXVkaW9DdHguYXVkaW9Xb3JrbGV0LmFkZE1vZHVsZSh3b3JrbGV0VXJsKTtcclxuXHJcbiAgICAgICAgICBjb25zdCB3b3JrbGV0Tm9kZSA9IG5ldyBBdWRpb1dvcmtsZXROb2RlKGF1ZGlvQ3R4LCBcImluZC1hdWRpby1jYXB0dXJlXCIpO1xyXG4gICAgICAgICAgd29ya2xldE5vZGVSZWYuY3VycmVudCA9IHdvcmtsZXROb2RlO1xyXG4gICAgICAgICAgY2FwdHVyZU5vZGUgPSB3b3JrbGV0Tm9kZTtcclxuXHJcbiAgICAgICAgICB3b3JrbGV0Tm9kZS5vbnByb2Nlc3NvcmVycm9yID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGxvZ0Vycm9yKFwiQXVkaW9Xb3JrbGV0IHByb2Nlc3NvciBlcnJvclwiLCBldmVudCk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgd29ya2xldE5vZGUucG9ydC5vbm1lc3NhZ2VlcnJvciA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBsb2dFcnJvcihcIkF1ZGlvV29ya2xldCBtZXNzYWdlIGVycm9yXCIsIGV2ZW50KTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICB3b3JrbGV0Tm9kZS5wb3J0Lm9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gZXZlbnQgJiYgZXZlbnQuZGF0YSA/IGV2ZW50LmRhdGEgOiBudWxsO1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEgfHwgZGF0YS50eXBlICE9PSBcImNodW5rXCIpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKCFpc1JlY29yZGluZ1JlZi5jdXJyZW50IHx8IGlzUGF1c2VkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJhdyA9IGRhdGEuc2FtcGxlcztcclxuICAgICAgICAgICAgaWYgKCFyYXcpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaHVuayA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChyYXcgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXkpIGNodW5rID0gcmF3O1xyXG4gICAgICAgICAgICBlbHNlIGlmIChyYXcuYnVmZmVyKSBjaHVuayA9IG5ldyBGbG9hdDMyQXJyYXkocmF3LmJ1ZmZlcik7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHJhdy5ieXRlTGVuZ3RoKSBjaHVuayA9IG5ldyBGbG9hdDMyQXJyYXkocmF3KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY2h1bmsgfHwgIWNodW5rLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjaHVua3NSZWYuY3VycmVudC5wdXNoKGNodW5rKTtcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgbG9nSW5mbyhcIkF1ZGlvV29ya2xldCBjYXB0dXJlIGVuYWJsZWRcIiwgd29ya2xldFVybCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBsb2dXYXJuKFwiQXVkaW9Xb3JrbGV0IGZhaWxlZC4gRmFsbGluZyBiYWNrIHRvIFNjcmlwdFByb2Nlc3Nvci5cIiwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9nV2FybihcIkF1ZGlvV29ya2xldCBub3Qgc3VwcG9ydGVkLiBVc2luZyBTY3JpcHRQcm9jZXNzb3IuXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWNhcHR1cmVOb2RlKSB7XHJcbiAgICAgICAgY29uc3QgcHJvY2Vzc29yID0gYXVkaW9DdHguY3JlYXRlU2NyaXB0UHJvY2Vzc29yKDQwOTYsIDEsIDEpO1xyXG4gICAgICAgIHByb2Nlc3NvclJlZi5jdXJyZW50ID0gcHJvY2Vzc29yO1xyXG4gICAgICAgIGNhcHR1cmVOb2RlID0gcHJvY2Vzc29yO1xyXG5cclxuICAgICAgICBwcm9jZXNzb3Iub25hdWRpb3Byb2Nlc3MgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFpc1JlY29yZGluZ1JlZi5jdXJyZW50IHx8IGlzUGF1c2VkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgICAgIGNvbnN0IGlucHV0ID0gZS5pbnB1dEJ1ZmZlci5nZXRDaGFubmVsRGF0YSgwKTtcclxuICAgICAgICAgIGNodW5rc1JlZi5jdXJyZW50LnB1c2gobmV3IEZsb2F0MzJBcnJheShpbnB1dCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEtlZXAgdGhlIGFuYWx5c2VyIG91dCBvZiB0aGUgcmVjb3JkaW5nIHBhdGggdG8gYXZvaWQgYWZmZWN0aW5nIGNhcHR1cmUuXHJcbiAgICAgIHNvdXJjZS5jb25uZWN0KGFuYWx5c2VyKTtcclxuICAgICAgYW5hbHlzZXIuY29ubmVjdCh6ZXJvR2Fpbik7XHJcbiAgICAgIHNvdXJjZS5jb25uZWN0KGNhcHR1cmVOb2RlKTtcclxuICAgICAgY2FwdHVyZU5vZGUuY29ubmVjdCh6ZXJvR2Fpbik7XHJcbiAgICAgIHplcm9HYWluLmNvbm5lY3QoYXVkaW9DdHguZGVzdGluYXRpb24pO1xyXG5cclxuICAgICAgc2FmZVNldFN0YXRlKCgpID0+IHtcclxuICAgICAgICBzZXRJc1JlY29yZGluZyh0cnVlKTtcclxuICAgICAgICBzZXRJc1BhdXNlZChmYWxzZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmVzZXRUaW1lcigpO1xyXG4gICAgICBzdGFydFRpbWVyKCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgc2FmZVN0b3BSZWNvcmRpbmdJbnRlcm5hbCh7IGtlZXBXYXY6IGZhbHNlLCBza2lwVWlTdGF0ZTogZmFsc2UgfSk7XHJcblxyXG4gICAgICBjb25zdCBtc2cgPSBidWlsZE1pY0Vycm9yTWVzc2FnZShlcnIpO1xyXG4gICAgICBjb25zdCBuYW1lID0gc2FmZUVyck5hbWUoZXJyKTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHNhZmVFcnJNZXNzYWdlKGVycik7XHJcblxyXG4gICAgICBzYWZlU2V0U3RhdGUoKCkgPT4ge1xyXG4gICAgICAgIHNldFVpRXJyb3IobXNnKTtcclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgY29uc3QgZGV0YWlsID0gbWVzc2FnZSA/IGAke25hbWV9IC0gJHttZXNzYWdlfWAgOiBuYW1lO1xyXG4gICAgICAgICAgc2V0VWlIaW50KGluZFQoXCJBdWRpb1JlY29yZGVyX0hpbnRfVGVjaG5pY2FsXCIsIFwiVGVjaG5pY2FsIGRldGFpbHM6IHswfVwiKS5yZXBsYWNlKFwiezB9XCIsIGRldGFpbCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAobXNnKSB7XHJcbiAgICAgICAgbm90aWZ5UmVjb3JkaW5nRXJyb3IobXNnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbG9nRXJyb3IoXCJBdWRpbyByZWNvcmRlciBzdGFydCBmYWlsZWRcIiwgZXJyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBhdXNlUmVjb3JkaW5nKCkge1xyXG4gICAgaWYgKCFpc1JlY29yZGluZykgcmV0dXJuO1xyXG4gICAgc2FmZVNldFN0YXRlKCgpID0+IHtcclxuICAgICAgc2V0SXNQYXVzZWQodHJ1ZSk7XHJcbiAgICB9KTtcclxuICAgIGlmICh3b3JrbGV0Tm9kZVJlZi5jdXJyZW50ICYmIHdvcmtsZXROb2RlUmVmLmN1cnJlbnQucG9ydCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHdvcmtsZXROb2RlUmVmLmN1cnJlbnQucG9ydC5wb3N0TWVzc2FnZSh7IHR5cGU6IFwic2V0UmVjb3JkaW5nXCIsIHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHBhdXNlVGltZXIoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc3VtZVJlY29yZGluZygpIHtcclxuICAgIGlmICghaXNSZWNvcmRpbmcpIHJldHVybjtcclxuICAgIHNhZmVTZXRTdGF0ZSgoKSA9PiB7XHJcbiAgICAgIHNldElzUGF1c2VkKGZhbHNlKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHdvcmtsZXROb2RlUmVmLmN1cnJlbnQgJiYgd29ya2xldE5vZGVSZWYuY3VycmVudC5wb3J0KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgd29ya2xldE5vZGVSZWYuY3VycmVudC5wb3J0LnBvc3RNZXNzYWdlKHsgdHlwZTogXCJzZXRSZWNvcmRpbmdcIiwgdmFsdWU6IHRydWUgfSk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGFydFRpbWVyKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBmdW5jdGlvbiBmaW5pc2hSZWNvcmRpbmcoKSB7XHJcbiAgICBpZiAoIWlzUmVjb3JkaW5nKSByZXR1cm47XHJcblxyXG4gICAgcGF1c2VUaW1lcigpO1xyXG5cclxuICAgIC8vIEZsdXNoIGFueSBidWZmZXJlZCB3b3JrbGV0IHNhbXBsZXMgYmVmb3JlIGJ1aWxkaW5nIHRoZSBXQVYuXHJcbiAgICBpZiAod29ya2xldE5vZGVSZWYuY3VycmVudCAmJiB3b3JrbGV0Tm9kZVJlZi5jdXJyZW50LnBvcnQpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB3b3JrbGV0Tm9kZVJlZi5jdXJyZW50LnBvcnQucG9zdE1lc3NhZ2UoeyB0eXBlOiBcInNldFJlY29yZGluZ1wiLCB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgICB9XHJcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB3aW5kb3cuc2V0VGltZW91dChyZXNvbHZlLCAzMCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY2h1bmtzUmVmLmN1cnJlbnQubGVuZ3RoKSB7XHJcbiAgICAgIHNhZmVTdG9wUmVjb3JkaW5nSW50ZXJuYWwoeyBrZWVwV2F2OiBmYWxzZSwgc2tpcFVpU3RhdGU6IGZhbHNlIH0pO1xyXG4gICAgICByZXNldFRpbWVyKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhbGwgPSBjaHVua3NSZWYuY3VycmVudDtcclxuICAgIGNvbnN0IHRvdGFsTGVuID0gYWxsLnJlZHVjZSgoc3VtLCBhKSA9PiBzdW0gKyBhLmxlbmd0aCwgMCk7XHJcbiAgICBjb25zdCBtZXJnZWQgPSBuZXcgRmxvYXQzMkFycmF5KHRvdGFsTGVuKTtcclxuXHJcbiAgICBsZXQgb2Zmc2V0ID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIG1lcmdlZC5zZXQoYWxsW2ldLCBvZmZzZXQpO1xyXG4gICAgICBvZmZzZXQgKz0gYWxsW2ldLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzYW1wbGVzMTYgPSBmbG9hdFRvMTZCaXRQQ00obWVyZ2VkKTtcclxuICAgIGNvbnN0IHdhdiA9IGVuY29kZVdhdih7IHNhbXBsZXMxNjogc2FtcGxlczE2LCBzYW1wbGVSYXRlOiBzYW1wbGVSYXRlUmVmLmN1cnJlbnQsIG51bUNoYW5uZWxzOiAxIH0pO1xyXG5cclxuICAgIHNhZmVTdG9wUmVjb3JkaW5nSW50ZXJuYWwoeyBrZWVwV2F2OiB0cnVlLCBza2lwVWlTdGF0ZTogZmFsc2UgfSk7XHJcblxyXG4gICAgY29uc3QgbGV2ZWxzID0gYnVpbGRTZWNvbmRMZXZlbHMobWVyZ2VkLCBzYW1wbGVSYXRlUmVmLmN1cnJlbnQpO1xyXG4gICAgY29uc3QgZHVyYXRpb25TZWMgPSBNYXRoLm1heCgxLCBNYXRoLmNlaWwobWVyZ2VkLmxlbmd0aCAvIHNhbXBsZVJhdGVSZWYuY3VycmVudCkpO1xyXG5cclxuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwod2F2KTtcclxuICAgIGNvbnN0IGZpbGVOYW1lID0gYnVpbGREb3dubG9hZEZpbGVOYW1lKGRvd25sb2FkQmFzZU5hbWUpO1xyXG4gICAgc2FmZVNldFN0YXRlKCgpID0+IHtcclxuICAgICAgc2V0V2F2QmxvYih3YXYpO1xyXG4gICAgICBzZXRXYXZVcmwodXJsKTtcclxuICAgICAgc2V0V2F2RmlsZU5hbWUoZmlsZU5hbWUpO1xyXG4gICAgICBzZXRXYXZMZXZlbHMobGV2ZWxzKTtcclxuICAgICAgc2V0V2F2RHVyYXRpb25TZWMoZHVyYXRpb25TZWMpO1xyXG4gICAgICBzZXRQbGF5YmFja1JlbWFpbmluZ1NlYyhkdXJhdGlvblNlYyk7XHJcbiAgICAgIHNldFBsYXliYWNrU2Vjb25kKDApO1xyXG4gICAgfSk7XHJcbiAgICBpZiAodHlwZW9mIG9uQXVkaW9SZWFkeSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgb25BdWRpb1JlYWR5KHdhdik7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjbGVhclJlY29yZGluZygpIHtcclxuICAgIHNhZmVTdG9wUGxheWJhY2soKTtcclxuICAgIHNhZmVTdG9wUmVjb3JkaW5nSW50ZXJuYWwoeyBrZWVwV2F2OiBmYWxzZSwgc2tpcFVpU3RhdGU6IGZhbHNlIH0pO1xyXG5cclxuICAgIGlmICh3YXZVcmxSZWYuY3VycmVudCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwod2F2VXJsUmVmLmN1cnJlbnQpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICAvKiBpZ25vcmUgKi9cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2FmZVNldFN0YXRlKCgpID0+IHtcclxuICAgICAgc2V0V2F2VXJsKG51bGwpO1xyXG4gICAgICBzZXRXYXZCbG9iKG51bGwpO1xyXG4gICAgICBzZXRXYXZGaWxlTmFtZShcIlwiKTtcclxuICAgICAgc2V0VWlFcnJvcihcIlwiKTtcclxuICAgICAgc2V0VWlIaW50KFwiXCIpO1xyXG4gICAgfSk7XHJcbiAgICBzZXRXYXZMZXZlbHMoW10pO1xyXG4gICAgc2V0V2F2RHVyYXRpb25TZWMoMCk7XHJcbiAgICBzZXRQbGF5YmFja1JlbWFpbmluZ1NlYygwKTtcclxuICAgIHNldFBsYXliYWNrU2Vjb25kKDApO1xyXG4gICAgaWYgKHR5cGVvZiBvbkF1ZGlvQ2xlYXJlZCA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgb25BdWRpb0NsZWFyZWQoKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaHVua3NSZWYuY3VycmVudCA9IFtdO1xyXG4gICAgcmVzZXRUaW1lcigpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2FmZVN0b3BSZWNvcmRpbmdJbnRlcm5hbChhcmdzKSB7XHJcbiAgICBjb25zdCBrZWVwV2F2ID0gYXJncy5rZWVwV2F2O1xyXG4gICAgY29uc3Qgc2tpcFVpU3RhdGUgPSBhcmdzLnNraXBVaVN0YXRlO1xyXG5cclxuICAgIHN0b3BFcUxvb3AoKTtcclxuICAgIGlmICgha2VlcFdhdikgcmVzZXRUaW1lcigpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGlmICh3b3JrbGV0Tm9kZVJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGlmICh3b3JrbGV0Tm9kZVJlZi5jdXJyZW50LnBvcnQpIHtcclxuICAgICAgICAgICAgd29ya2xldE5vZGVSZWYuY3VycmVudC5wb3J0LnBvc3RNZXNzYWdlKHsgdHlwZTogXCJzZXRSZWNvcmRpbmdcIiwgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdvcmtsZXROb2RlUmVmLmN1cnJlbnQuZGlzY29ubmVjdCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChwcm9jZXNzb3JSZWYuY3VycmVudCkgcHJvY2Vzc29yUmVmLmN1cnJlbnQuZGlzY29ubmVjdCgpO1xyXG4gICAgICBpZiAoYW5hbHlzZXJSZWYuY3VycmVudCkgYW5hbHlzZXJSZWYuY3VycmVudC5kaXNjb25uZWN0KCk7XHJcbiAgICAgIGlmIChzb3VyY2VSZWYuY3VycmVudCkgc291cmNlUmVmLmN1cnJlbnQuZGlzY29ubmVjdCgpO1xyXG4gICAgICBpZiAoemVyb0dhaW5SZWYuY3VycmVudCkgemVyb0dhaW5SZWYuY3VycmVudC5kaXNjb25uZWN0KCk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKGF1ZGlvQ3R4UmVmLmN1cnJlbnQgJiYgYXVkaW9DdHhSZWYuY3VycmVudC5zdGF0ZSAhPT0gXCJjbG9zZWRcIikgYXVkaW9DdHhSZWYuY3VycmVudC5jbG9zZSgpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChzdHJlYW1SZWYuY3VycmVudCkge1xyXG4gICAgICAgIGNvbnN0IHRyYWNrcyA9IHN0cmVhbVJlZi5jdXJyZW50LmdldFRyYWNrcygpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2tzLmxlbmd0aDsgaSsrKSB0cmFja3NbaV0uc3RvcCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc29yUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgYW5hbHlzZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBzb3VyY2VSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB6ZXJvR2FpblJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHdvcmtsZXROb2RlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgYXVkaW9DdHhSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBzdHJlYW1SZWYuY3VycmVudCA9IG51bGw7XHJcblxyXG4gICAgaWYgKCFza2lwVWlTdGF0ZSkge1xyXG4gICAgICBzYWZlU2V0U3RhdGUoKCkgPT4ge1xyXG4gICAgICAgIHNldElzUmVjb3JkaW5nKGZhbHNlKTtcclxuICAgICAgICBzZXRJc1BhdXNlZChmYWxzZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdG9nZ2xlUGxheSgpIHtcclxuICAgIGNvbnN0IGF1ZGlvRWwgPSBhdWRpb0VsUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWF1ZGlvRWwgfHwgIXdhdlVybCkgcmV0dXJuO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChhdWRpb0VsLnBhdXNlZCkgYXVkaW9FbC5wbGF5KCk7XHJcbiAgICAgIGVsc2UgYXVkaW9FbC5wYXVzZSgpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc3luY0NhbnZhc1NpemUoKSB7XHJcbiAgICBjb25zdCBjYW52YXMgPSBiYXJzQ2FudmFzUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHcgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKGNhbnZhcy5jbGllbnRXaWR0aCkpO1xyXG4gICAgY29uc3QgaCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoY2FudmFzLmNsaWVudEhlaWdodCkpO1xyXG4gICAgaWYgKGNhbnZhcy53aWR0aCAhPT0gdykgY2FudmFzLndpZHRoID0gdztcclxuICAgIGlmIChjYW52YXMuaGVpZ2h0ICE9PSBoKSBjYW52YXMuaGVpZ2h0ID0gaDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHN0YXJ0RXFMb29wKCkge1xyXG4gICAgaWYgKHJhZklkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgIGNvbnN0IGNhbnZhcyA9IGJhcnNDYW52YXNSZWYuY3VycmVudDtcclxuICAgIGNvbnN0IGFuYWx5c2VyID0gYW5hbHlzZXJSZWYuY3VycmVudDtcclxuICAgIGlmICghY2FudmFzIHx8ICFhbmFseXNlcikgcmV0dXJuO1xyXG5cclxuICAgIHN5bmNDYW52YXNTaXplKCk7XHJcblxyXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIGlmICghY3R4KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgZnJlcSA9IG5ldyBVaW50OEFycmF5KGFuYWx5c2VyLmZyZXF1ZW5jeUJpbkNvdW50KTtcclxuXHJcbiAgICBmdW5jdGlvbiBsb29wKCkge1xyXG4gICAgICByYWZJZFJlZi5jdXJyZW50ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG5cclxuICAgICAgYW5hbHlzZXIuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEoZnJlcSk7XHJcblxyXG4gICAgICBjb25zdCB3ID0gY2FudmFzLndpZHRoO1xyXG4gICAgICBjb25zdCBoID0gY2FudmFzLmhlaWdodDtcclxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB3LCBoKTtcclxuXHJcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBicmFuZFJnYmEoMC4xMCk7XHJcbiAgICAgIGN0eC5maWxsUmVjdCgwLCBNYXRoLmZsb29yKGggLyAyKSwgdywgMSk7XHJcblxyXG4gICAgICBjb25zdCBnYXAgPSBiYXJHYXBQeDtcclxuICAgICAgY29uc3QgYmFyVyA9IGJhcldpZHRoUHg7XHJcbiAgICAgIGxldCBjb3VudCA9IE1hdGguZmxvb3IoKHcgKyBnYXApIC8gKGJhclcgKyBnYXApKTtcclxuICAgICAgaWYgKGNvdW50IDwgYmFyTWluQ291bnQpIGNvdW50ID0gYmFyTWluQ291bnQ7XHJcbiAgICAgIGlmIChjb3VudCA+IGJhck1heENvdW50KSBjb3VudCA9IGJhck1heENvdW50O1xyXG5cclxuICAgICAgY29uc3QgdG90YWxXID0gY291bnQgKiBiYXJXICsgKGNvdW50IC0gMSkgKiBnYXA7XHJcbiAgICAgIGNvbnN0IHN0YXJ0WCA9IE1hdGguZmxvb3IoKHcgLSB0b3RhbFcpIC8gMik7XHJcblxyXG4gICAgICBjb25zdCBtYXhIID0gTWF0aC5mbG9vcihoICogMC45Mik7XHJcblxyXG4gICAgICBpZiAoIWVxTGFzdFJlZi5jdXJyZW50IHx8IGVxTGFzdFJlZi5jdXJyZW50Lmxlbmd0aCAhPT0gY291bnQpIHtcclxuICAgICAgICBlcUxhc3RSZWYuY3VycmVudCA9IG5ldyBBcnJheShjb3VudCkuZmlsbCgwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgaWR4ID0gTWF0aC5mbG9vcigoaSAvIGNvdW50KSAqIGZyZXEubGVuZ3RoKTtcclxuICAgICAgICBjb25zdCB2ID0gTWF0aC5wb3coZnJlcVtpZHhdIC8gMjU1LCAwLjkpO1xyXG5cclxuICAgICAgICBjb25zdCBsYXN0ID0gZXFMYXN0UmVmLmN1cnJlbnRbaV0gfHwgMDtcclxuICAgICAgICBjb25zdCBzbW9vdGggPSBsYXN0ICogMC43OCArIHYgKiAwLjIyO1xyXG4gICAgICAgIGVxTGFzdFJlZi5jdXJyZW50W2ldID0gc21vb3RoO1xyXG5cclxuICAgICAgICBjb25zdCBiYXJIID0gTWF0aC5tYXgoMiwgTWF0aC5mbG9vcihzbW9vdGggKiBtYXhIKSk7XHJcbiAgICAgICAgY29uc3QgeCA9IHN0YXJ0WCArIGkgKiAoYmFyVyArIGdhcCk7XHJcbiAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoKGggLSBiYXJIKSAvIDIpO1xyXG5cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gYnJhbmRSZ2JhKDAuNDIpO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCh4LCB5LCBiYXJXLCBiYXJIKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJhZklkUmVmLmN1cnJlbnQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzdG9wRXFMb29wKCkge1xyXG4gICAgaWYgKHJhZklkUmVmLmN1cnJlbnQpIHtcclxuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmSWRSZWYuY3VycmVudCk7XHJcbiAgICAgIHJhZklkUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZHJhd0VxSWRsZSgpIHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IGJhcnNDYW52YXNSZWYuY3VycmVudDtcclxuICAgIGlmICghY2FudmFzKSByZXR1cm47XHJcblxyXG4gICAgc3luY0NhbnZhc1NpemUoKTtcclxuXHJcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgaWYgKCFjdHgpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB3ID0gY2FudmFzLndpZHRoO1xyXG4gICAgY29uc3QgaCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHcsIGgpO1xyXG5cclxuICAgIGN0eC5maWxsU3R5bGUgPSBicmFuZFJnYmEoMC4wOCk7XHJcbiAgICBjdHguZmlsbFJlY3QoMCwgTWF0aC5mbG9vcihoIC8gMiksIHcsIDEpO1xyXG5cclxuICAgIGNvbnN0IGdhcCA9IGJhckdhcFB4O1xyXG4gICAgY29uc3QgYmFyVyA9IGJhcldpZHRoUHg7XHJcbiAgICBsZXQgY291bnQgPSBNYXRoLmZsb29yKCh3ICsgZ2FwKSAvIChiYXJXICsgZ2FwKSk7XHJcbiAgICBpZiAoY291bnQgPCBiYXJNaW5Db3VudCkgY291bnQgPSBiYXJNaW5Db3VudDtcclxuICAgIGlmIChjb3VudCA+IGJhck1heENvdW50KSBjb3VudCA9IGJhck1heENvdW50O1xyXG5cclxuICAgIGNvbnN0IHRvdGFsVyA9IGNvdW50ICogYmFyVyArIChjb3VudCAtIDEpICogZ2FwO1xyXG4gICAgY29uc3Qgc3RhcnRYID0gTWF0aC5mbG9vcigodyAtIHRvdGFsVykgLyAyKTtcclxuXHJcbiAgICBjb25zdCBtYXhIID0gTWF0aC5mbG9vcihoICogMC4zNSk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgY29uc3QgdiA9IDAuMTggKyAoaSAlIDkpICogMC4wMTtcclxuICAgICAgY29uc3QgYmFySCA9IE1hdGgubWF4KDIsIE1hdGguZmxvb3IodiAqIG1heEgpKTtcclxuXHJcbiAgICAgIGNvbnN0IHggPSBzdGFydFggKyBpICogKGJhclcgKyBnYXApO1xyXG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcigoaCAtIGJhckgpIC8gMik7XHJcblxyXG4gICAgICBjdHguZmlsbFN0eWxlID0gYnJhbmRSZ2JhKDAuMTYpO1xyXG4gICAgICBjdHguZmlsbFJlY3QoeCwgeSwgYmFyVywgYmFySCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkcmF3RXFXYXZlZm9ybShhY3RpdmVTZWNvbmQpIHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IGJhcnNDYW52YXNSZWYuY3VycmVudDtcclxuICAgIGlmICghY2FudmFzKSByZXR1cm47XHJcblxyXG4gICAgc3luY0NhbnZhc1NpemUoKTtcclxuXHJcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgaWYgKCFjdHgpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBsZXZlbHMgPSB3YXZMZXZlbHNSZWYuY3VycmVudCB8fCBbXTtcclxuICAgIGlmICghbGV2ZWxzLmxlbmd0aCkge1xyXG4gICAgICBkcmF3RXFJZGxlKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB3ID0gY2FudmFzLndpZHRoO1xyXG4gICAgY29uc3QgaCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHcsIGgpO1xyXG5cclxuICAgIGN0eC5maWxsU3R5bGUgPSBicmFuZFJnYmEoMC4xMCk7XHJcbiAgICBjdHguZmlsbFJlY3QoMCwgTWF0aC5mbG9vcihoIC8gMiksIHcsIDEpO1xyXG5cclxuICAgIGNvbnN0IG1heEggPSBNYXRoLmZsb29yKGggKiAwLjkpO1xyXG4gICAgY29uc3QgbWluSCA9IDM7XHJcblxyXG4gICAgY29uc3QgYmFyVyA9IDM7XHJcbiAgICBjb25zdCBnYXAgPSAyO1xyXG4gICAgY29uc3QgbWluQmFycyA9IDQ4O1xyXG4gICAgY29uc3QgbWF4QmFycyA9IDE0MDtcclxuICAgIGNvbnN0IGZpdEJhcnMgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKCh3ICsgZ2FwKSAvIChiYXJXICsgZ2FwKSkpO1xyXG4gICAgY29uc3QgY291bnQgPSBNYXRoLm1heChtaW5CYXJzLCBNYXRoLm1pbihtYXhCYXJzLCBNYXRoLm1heChsZXZlbHMubGVuZ3RoLCBmaXRCYXJzKSkpO1xyXG4gICAgY29uc3QgdG90YWxXID0gY291bnQgKiBiYXJXICsgKGNvdW50IC0gMSkgKiBnYXA7XHJcbiAgICBjb25zdCBzdGFydFggPSBNYXRoLm1heCgwLCBNYXRoLmZsb29yKCh3IC0gdG90YWxXKSAvIDIpKTtcclxuXHJcbiAgICBjb25zdCBkdXJhdGlvblNlYyA9IE1hdGgubWF4KDEsIHdhdkR1cmF0aW9uU2VjIHx8IGxldmVscy5sZW5ndGggfHwgMSk7XHJcbiAgICBjb25zdCBhY3RpdmVJbmRleCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGNvdW50IC0gMSwgTWF0aC5mbG9vcigoYWN0aXZlU2Vjb25kIC8gZHVyYXRpb25TZWMpICogKGNvdW50IC0gMSkpKSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHQgPSBjb3VudCA+IDEgPyBpIC8gKGNvdW50IC0gMSkgOiAwO1xyXG4gICAgICBjb25zdCByYXdJbmRleCA9IHQgKiBNYXRoLm1heCgwLCBsZXZlbHMubGVuZ3RoIC0gMSk7XHJcbiAgICAgIGNvbnN0IGxvdyA9IE1hdGguZmxvb3IocmF3SW5kZXgpO1xyXG4gICAgICBjb25zdCBoaWdoID0gTWF0aC5taW4obGV2ZWxzLmxlbmd0aCAtIDEsIGxvdyArIDEpO1xyXG4gICAgICBjb25zdCBmcmFjID0gcmF3SW5kZXggLSBsb3c7XHJcbiAgICAgIGNvbnN0IHZMb3cgPSBsZXZlbHNbbG93XSB8fCAwO1xyXG4gICAgICBjb25zdCB2SGlnaCA9IGxldmVsc1toaWdoXSB8fCAwO1xyXG4gICAgICBjb25zdCB2ID0gdkxvdyAqICgxIC0gZnJhYykgKyB2SGlnaCAqIGZyYWM7XHJcbiAgICAgIGNvbnN0IGJhckggPSBNYXRoLm1heChtaW5ILCBNYXRoLmZsb29yKHYgKiAobWF4SCAtIG1pbkgpICsgbWluSCkpO1xyXG4gICAgICBjb25zdCB4ID0gc3RhcnRYICsgaSAqIChiYXJXICsgZ2FwKTtcclxuICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoKGggLSBiYXJIKSAvIDIpO1xyXG5cclxuICAgICAgY29uc3QgaXNBY3RpdmUgPSBpID09PSBhY3RpdmVJbmRleDtcclxuICAgICAgY3R4LmZpbGxTdHlsZSA9IGlzQWN0aXZlID8gYnJhbmRSZ2JhKDAuNzgpIDogYnJhbmRSZ2JhKDAuMjgpO1xyXG4gICAgICBkcmF3Um91bmRlZFJlY3QoY3R4LCB4LCB5LCBiYXJXLCBiYXJILCBNYXRoLm1pbig2LCBNYXRoLmZsb29yKGJhclcgLyAyKSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb25DZW50ZXJDbGljaygpIHtcclxuICAgIGlmICghaXNSZWNvcmRpbmcpIHtcclxuICAgICAgc3RhcnRSZWNvcmRpbmcoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzUGF1c2VkKSByZXN1bWVSZWNvcmRpbmcoKTtcclxuICAgIGVsc2UgcGF1c2VSZWNvcmRpbmcoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG9uUmlnaHRDbGljaygpIHtcclxuICAgIGlmIChpc1JlY29yZGluZykge1xyXG4gICAgICBmaW5pc2hSZWNvcmRpbmcoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHdhdkJsb2IpIGNsZWFyUmVjb3JkaW5nKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjZW50ZXJMYWJlbCA9ICFpc1JlY29yZGluZ1xyXG4gICAgPyBpbmRUKFwiQXVkaW9SZWNvcmRlcl9SZWNvcmRcIiwgXCJSZWNvcmRcIilcclxuICAgIDogaXNQYXVzZWRcclxuICAgICAgPyBpbmRUKFwiQXVkaW9SZWNvcmRlcl9SZXN1bWVcIiwgXCJSZXN1bWVcIilcclxuICAgICAgOiBpbmRUKFwiQXVkaW9SZWNvcmRlcl9QYXVzZVwiLCBcIlBhdXNlXCIpO1xyXG5cclxuICBjb25zdCB0b3RhbFdhdk1zID0gd2F2RHVyYXRpb25TZWMgPiAwID8gd2F2RHVyYXRpb25TZWMgKiAxMDAwIDogMDtcclxuICBjb25zdCByZW1haW5pbmdXYXZNcyA9IHdhdkR1cmF0aW9uU2VjID4gMCA/IE1hdGgubWF4KDAsIHBsYXliYWNrUmVtYWluaW5nU2VjICogMTAwMCkgOiAwO1xyXG4gIGNvbnN0IHRpbWVyVGV4dCA9IGlzUmVjb3JkaW5nXHJcbiAgICA/IGZvcm1hdFRpbWVNcyhlbGFwc2VkTXMpXHJcbiAgICA6IHdhdlVybFxyXG4gICAgICA/IGZvcm1hdFRpbWVNcyhyZW1haW5pbmdXYXZNcyB8fCB0b3RhbFdhdk1zKVxyXG4gICAgICA6IGZvcm1hdFRpbWVNcygwKTtcclxuXHJcbiAgY29uc3QgaXNBY3RpdmVSZWMgPSBpc1JlY29yZGluZyAmJiAhaXNQYXVzZWQ7XHJcbiAgY29uc3Qgc3RhdHVzVGV4dCA9IHVpRXJyb3JcclxuICAgID8gXCJcIlxyXG4gICAgOiBpc0FjdGl2ZVJlY1xyXG4gICAgICA/IGluZFQoXCJBdWRpb1JlY29yZGVyX1N0YXR1c19SZWNvcmRpbmdcIiwgXCJSZWNvcmRpbmdcIilcclxuICAgICAgOiBpc1BhdXNlZFxyXG4gICAgICAgID8gaW5kVChcIkF1ZGlvUmVjb3JkZXJfU3RhdHVzX1BhdXNlZFwiLCBcIlBhdXNlZFwiKVxyXG4gICAgICAgIDogd2F2VXJsXHJcbiAgICAgICAgICA/IGluZFQoXCJBdWRpb1JlY29yZGVyX1N0YXR1c19SZWFkeVRvUGxheVwiLCBcIlJlYWR5IHRvIHBsYXlcIilcclxuICAgICAgICAgIDogaW5kVChcIkF1ZGlvUmVjb3JkZXJfU3RhdHVzX1JlYWR5XCIsIFwiUmVhZHlcIik7XHJcblxyXG4gIGNvbnN0IHRpbWVyQWxwaGEgPSBpc0FjdGl2ZVJlYyA/IDAuNTUgOiBpc1BhdXNlZCA/IDAuNDYgOiAwLjQwO1xyXG4gIGNvbnN0IHN0YXR1c0FscGhhID0gMC4zNTtcclxuICBjb25zdCBjYXJkQmcgPSBcInJhZGlhbC1ncmFkaWVudCg3MDBweCBjaXJjbGUgYXQgMTglIDAlLCByZ2JhKDAsIDQxLCAxMDcsIDAuMDYpLCB0cmFuc3BhcmVudCA1NSUpXCI7XHJcblxyXG4gIGNvbnN0IG91dGVyQ2xhc3NOYW1lID0gZW1iZWRkZWRcclxuICAgID8gXCJ3LWZ1bGxcIlxyXG4gICAgOiBcInctZnVsbCBtaW4taC1bMjgwcHhdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBzbTpwLTZcIjtcclxuXHJcbiAgY29uc3Qgb3V0ZXJTdHlsZSA9IGVtYmVkZGVkXHJcbiAgICA/IHVuZGVmaW5lZFxyXG4gICAgOiB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcInJhZGlhbC1ncmFkaWVudCg5MDBweCBjaXJjbGUgYXQgMjAlIDIwJSwgcmdiYSgwLCA0MSwgMTA3LCAwLjA4KSwgdHJhbnNwYXJlbnQgNjAlKVwiLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMDUpXCIsXHJcbiAgICAgICAgZm9udEZhbWlseTogJ1wiTW9udHNlcnJhdFwiLCBzYW5zLXNlcmlmJyxcclxuICAgICAgfTtcclxuXHJcbiAgY29uc3QgY2FyZENsYXNzTmFtZSA9IGVtYmVkZGVkXHJcbiAgICA/IFwicmVsYXRpdmUgdy1mdWxsIHJvdW5kZWQteGwgc206cm91bmRlZC0yeGwgYmctd2hpdGUgYm9yZGVyIHNoYWRvdy14bFwiXHJcbiAgICA6IFwicmVsYXRpdmUgdy1mdWxsIG1heC13LVszNjBweF0gc206bWF4LXctWzQyMHB4XSBsZzptYXgtdy1bNTIwcHhdIHJvdW5kZWQteGwgc206cm91bmRlZC0yeGwgYmctd2hpdGUgYm9yZGVyIHNoYWRvdy14bFwiO1xyXG5cclxuICBjb25zdCBzaG93VHJhbnNjcmliZUJ1dHRvbiA9ICEhd2F2QmxvYiAmJiB0eXBlb2Ygb25UcmFuc2NyaWJlID09PSBcImZ1bmN0aW9uXCI7XHJcbiAgY29uc3QgdHJhbnNjcmliZVRleHQgPSB0cmFuc2NyaWJlTGFiZWwgfHwgaW5kVChcIlRleHRFZGl0b3JfVHJhbnNjcmliZVwiLCBcIlRyYW5zY3JpYmVcIik7XHJcbiAgY29uc3QgdHJhbnNjcmliZUJ1c3lUZXh0ID0gdHJhbnNjcmliZUJ1c3lMYWJlbCB8fCBpbmRUKFwiVGV4dEVkaXRvcl9UcmFuc2NyaWJpbmdcIiwgXCJUcmFuc2NyaWJpbmdcIik7XHJcbiAgICBjb25zdCBzaG93RG93bmxvYWRCdXR0b24gPSBmYWxzZTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtvdXRlckNsYXNzTmFtZX0gc3R5bGU9e291dGVyU3R5bGV9PlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPXtjYXJkQ2xhc3NOYW1lfVxyXG4gICAgICAgIHN0eWxlPXt7IGJvcmRlckNvbG9yOiBcInJnYmEoMCwgNDEsIDEwNywgMC4xOClcIiwgYmFja2dyb3VuZEltYWdlOiBjYXJkQmcgfX1cclxuICAgICAgPlxyXG4gICAgICAgIHshd2F2VXJsID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC00IHRvcC00IHNtOnJpZ2h0LTUgc206dG9wLTVcIj5cclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvbnQtbGlnaHQgaXRhbGljIHRhYnVsYXItbnVtcyB0ZXh0LVsxNnB4XSBzbTp0ZXh0LVsxOHB4XSBsZWFkaW5nLW5vbmUgdHJhY2tpbmctWzAuMTRlbV1cIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiBicmFuZFJnYmEodGltZXJBbHBoYSkgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHt0aW1lclRleHR9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTUgc206cHgtNyBwdC0zIHNtOnB0LTQgJHt3YXZVcmwgPyBcInBiLTAgc206cGItMVwiIDogXCJwYi0xIHNtOnBiLTJcIn1gfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cclxuICAgICAgICAgICAgPGNhbnZhcyByZWY9e2JhcnNDYW52YXNSZWZ9IGNsYXNzTmFtZT1cInctZnVsbCBoLTEyIHNtOmgtMTZcIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICB7d2F2VXJsID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTAuNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvbnQtbGlnaHQgaXRhbGljIHRhYnVsYXItbnVtcyB0ZXh0LVsxNnB4XSBzbTp0ZXh0LVsxOHB4XSBsZWFkaW5nLW5vbmUgdHJhY2tpbmctWzAuMTRlbV1cIlxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IGJyYW5kUmdiYSh0aW1lckFscGhhKSB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHt0aW1lclRleHR9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcHgtNSBzbTpweC03IHBiLTQgc206cGItNSAke3dhdlVybCA/IFwicHQtMSBzbTpwdC0yXCIgOiBcInB0LTIgc206cHQtM1wifWB9PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiIHN0eWxlPXt7IGdhcDogXCIyNHB4XCIgfX0+XHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBvbkNsaWNrPXt0b2dnbGVQbGF5fVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXshd2F2VXJsfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtMTIgdy0xMiBzbTpoLTE0IHNtOnctMTQgcm91bmRlZC1tZCBib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdHJhbnNpdGlvbiBzaGFkb3cteHMgaG92ZXI6c2hhZG93LW1kIGFjdGl2ZTpzY2FsZS05NVwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiB3YXZVcmwgPyBcInJnYmEoMCwgNDEsIDEwNywgMC4yMilcIiA6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjE4KVwiLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB3YXZVcmwgPyBcInJnYmEoMCwgNDEsIDEwNywgMC4wNilcIiA6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjA0KVwiLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogd2F2VXJsID8gMSA6IDAuNDUsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6IHdhdlVybCA/IFwicG9pbnRlclwiIDogXCJub3QtYWxsb3dlZFwiLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkF1ZGlvUmVjb3JkZXJfUGxheVwiLCBcIlBsYXlcIil9XHJcbiAgICAgICAgICAgICAgdGl0bGU9e3dhdlVybCA/IChpc1BsYXlpbmcgPyBpbmRUKFwiQXVkaW9SZWNvcmRlcl9QYXVzZVwiLCBcIlBhdXNlXCIpIDogaW5kVChcIkF1ZGlvUmVjb3JkZXJfUGxheVwiLCBcIlBsYXlcIikpIDogaW5kVChcIkF1ZGlvUmVjb3JkZXJfTm9BdWRpb1wiLCBcIk5vIGF1ZGlvXCIpfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge2lzUGxheWluZyA/IChcclxuICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMlwiIGhlaWdodD1cIjIyXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3R5bGU9e3sgY29sb3I6IElORF9CUkFORCB9fT5cclxuICAgICAgICAgICAgICAgICAgPHJlY3QgeD1cIjZcIiB5PVwiNVwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjE0XCIgcng9XCIxXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIxNFwiIHk9XCI1XCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiMTRcIiByeD1cIjFcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjJcIiBoZWlnaHQ9XCIyMlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0eWxlPXt7IGNvbG9yOiBJTkRfQlJBTkQgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOSA3TDE5IDEyTDkgMTdWN1pcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2VudGVyQ2xpY2t9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFjYW5SZWNvcmR9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC0xNCB3LTE0IHNtOmgtMTYgc206dy0xNiByb3VuZGVkLW1kIGJvcmRlciBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2l0aW9uIHNoYWRvdy14cyBob3ZlcjpzaGFkb3ctbWQgYWN0aXZlOnNjYWxlLTk1XCJcclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjE4KVwiLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjYW5SZWNvcmQgPyBcInJnYmEoMCwgNDEsIDEwNywgMC4wNilcIiA6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjA0KVwiLFxyXG4gICAgICAgICAgICAgICAgYm94U2hhZG93OiBpc0FjdGl2ZVJlY1xyXG4gICAgICAgICAgICAgICAgICA/IFwiMCAwIDAgN3B4IHJnYmEoMCwgNDEsIDEwNywgMC4wOCksIDAgMTRweCAzNHB4IHJnYmEoMCwgNDEsIDEwNywgMC4xNClcIlxyXG4gICAgICAgICAgICAgICAgICA6IFwiMCAxMHB4IDIycHggcmdiYSgwLCA0MSwgMTA3LCAwLjA4KVwiLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogY2FuUmVjb3JkID8gMSA6IDAuNDUsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6IGNhblJlY29yZCA/IFwicG9pbnRlclwiIDogXCJub3QtYWxsb3dlZFwiLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17Y2VudGVyTGFiZWx9XHJcbiAgICAgICAgICAgICAgdGl0bGU9e2NlbnRlckxhYmVsfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgeyFpc1JlY29yZGluZyA/IChcclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImgtNSB3LTUgcm91bmRlZC1tZCBiZy1yZWQtNTAwXCIgLz5cclxuICAgICAgICAgICAgICApIDogaXNQYXVzZWQgPyAoXHJcbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjJcIiBoZWlnaHQ9XCIyMlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0eWxlPXt7IGNvbG9yOiBJTkRfQlJBTkQgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOSA3TDE5IDEyTDkgMTdWN1pcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjJcIiBoZWlnaHQ9XCIyMlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0eWxlPXt7IGNvbG9yOiBJTkRfQlJBTkQgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxyZWN0IHg9XCI2XCIgeT1cIjVcIiB3aWR0aD1cIjRcIiBoZWlnaHQ9XCIxNFwiIHJ4PVwiMVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8cmVjdCB4PVwiMTRcIiB5PVwiNVwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjE0XCIgcng9XCIxXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBvbkNsaWNrPXtvblJpZ2h0Q2xpY2t9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc1JlY29yZGluZ31cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLTEyIHctMTIgc206aC0xNCBzbTp3LTE0IHJvdW5kZWQtbWQgYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zaXRpb24gc2hhZG93LXhzIGhvdmVyOnNoYWRvdy1tZCBhY3RpdmU6c2NhbGUtOTVcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogaXNSZWNvcmRpbmcgPyBcInJnYmEoMCwgNDEsIDEwNywgMC4yMilcIiA6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjE4KVwiLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpc1JlY29yZGluZyA/IFwicmdiYSgwLCA0MSwgMTA3LCAwLjA2KVwiIDogXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMDQpXCIsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiBpc1JlY29yZGluZyA/IDEgOiAwLjQ1LFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiBpc1JlY29yZGluZyA/IFwicG9pbnRlclwiIDogXCJub3QtYWxsb3dlZFwiLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aXNSZWNvcmRpbmcgPyBpbmRUKFwiQXVkaW9SZWNvcmRlcl9TdG9wXCIsIFwiU3RvcFwiKSA6IGluZFQoXCJBdWRpb1JlY29yZGVyX0NhbmNlbFwiLCBcIkNhbmNlbFwiKX1cclxuICAgICAgICAgICAgICB0aXRsZT17aXNSZWNvcmRpbmcgPyBpbmRUKFwiQXVkaW9SZWNvcmRlcl9TdG9wXCIsIFwiU3RvcFwiKSA6IGluZFQoXCJBdWRpb1JlY29yZGVyX0NhbmNlbFwiLCBcIkNhbmNlbFwiKX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3R5bGU9e3sgY29sb3I6IElORF9CUkFORCB9fT5cclxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCI3XCIgeT1cIjdcIiB3aWR0aD1cIjEwXCIgaGVpZ2h0PVwiMTBcIiByeD1cIjFcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICB7c2hvd0Rvd25sb2FkQnV0dG9uIHx8IHNob3dUcmFuc2NyaWJlQnV0dG9uID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1lbmQgZ2FwLTIgZmxleC13cmFwXCI+XHJcbiAgICAgICAgICAgICAge3Nob3dEb3dubG9hZEJ1dHRvbiA/IChcclxuICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgIGhyZWY9e3dhdlVybCB8fCB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAgICAgIGRvd25sb2FkPXt3YXZGaWxlTmFtZSB8fCB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMS41IHJvdW5kZWQtbWQgYm9yZGVyIHRleHQtWzEzcHhdIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24gc2hhZG93LXhzIGhvdmVyOnNoYWRvdy1tZCBhY3RpdmU6c2NhbGUtOTVcIlxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInJnYmEoMCwgNDEsIDEwNywgMC4yMilcIixcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjA0KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBJTkRfQlJBTkQsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2Rvd25sb2FkTGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtkb3dubG9hZExhYmVsfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7ZG93bmxvYWRMYWJlbH1cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICB7c2hvd1RyYW5zY3JpYmVCdXR0b24gPyAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblRyYW5zY3JpYmUgJiYgb25UcmFuc2NyaWJlKHdhdkJsb2IpfVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJhbnNjcmliZUJ1c3l9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMS41IHJvdW5kZWQtbWQgYm9yZGVyIHRleHQtWzEzcHhdIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24gc2hhZG93LXhzIGhvdmVyOnNoYWRvdy1tZCBhY3RpdmU6c2NhbGUtOTVcIlxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInJnYmEoMCwgNDEsIDEwNywgMC4yMilcIixcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRyYW5zY3JpYmVCdXN5ID8gXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMDgpXCIgOiBcInJnYmEoMCwgNDEsIDEwNywgMC4wNClcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogSU5EX0JSQU5ELFxyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IHRyYW5zY3JpYmVCdXN5ID8gMC43IDogMSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IHRyYW5zY3JpYmVCdXN5ID8gXCJub3QtYWxsb3dlZFwiIDogXCJwb2ludGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RyYW5zY3JpYmVCdXN5ID8gdHJhbnNjcmliZUJ1c3lUZXh0IDogdHJhbnNjcmliZVRleHR9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0cmFuc2NyaWJlQnVzeSA/IHRyYW5zY3JpYmVCdXN5VGV4dCA6IHRyYW5zY3JpYmVUZXh0fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7dHJhbnNjcmliZUJ1c3kgPyB0cmFuc2NyaWJlQnVzeVRleHQgOiB0cmFuc2NyaWJlVGV4dH1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIDxhdWRpbyByZWY9e2F1ZGlvRWxSZWZ9IHNyYz17d2F2VXJsIHx8IHVuZGVmaW5lZH0gY2xhc3NOYW1lPVwiaGlkZGVuXCIgLz5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTMgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgbWluLWgtWzIycHhdXCI+XHJcbiAgICAgICAgICAgIHt1aUVycm9yID8gKFxyXG4gICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1yb3NlLTcwMCB0ZXh0LWNlbnRlciBsZWFkaW5nLXRpZ2h0XCI+e3VpRXJyb3J9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7dWlIaW50ID8gKFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNjAwIHRleHQtY2VudGVyIGxlYWRpbmctdGlnaHRcIj57dWlIaW50fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGxlYWRpbmctdGlnaHRcIiBzdHlsZT17eyBjb2xvcjogYnJhbmRSZ2JhKHN0YXR1c0FscGhhKSB9fT5cclxuICAgICAgICAgICAgICAgIHtzdGF0dXNUZXh0fVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7O0FBQUEsbUJBQW1EO0FBMHJDdkM7QUF4ckNaLElBQU0sV0FBVyxXQUFXLGdCQUFnQixDQUFDO0FBQzdDLElBQU0sT0FBTyxDQUFDLEtBQWEsYUFDeEIsWUFBWSxPQUFPLFNBQVMsR0FBRyxNQUFNLFlBQVksU0FBUyxHQUFHLEtBQU0sWUFBWTtBQTBCbEYsSUFBTSxZQUFZO0FBQ2xCLElBQU0sZ0JBQWdCLENBQUMsR0FBRyxJQUFJLEdBQUc7QUFDakMsSUFBTSx5QkFBeUI7QUFDL0IsSUFBTSx1QkFBdUI7QUFFN0IsU0FBUyxXQUFXLE1BQU07QUFDeEIsTUFBSSxPQUFPLFlBQVksZUFBZSxRQUFRLE1BQU07QUFDbEQsWUFBUSxLQUFLLHNCQUFzQixHQUFHLElBQUk7QUFBQSxFQUM1QztBQUNGO0FBRUEsU0FBUyxXQUFXLE1BQU07QUFDeEIs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
