import React, { useEffect, useRef, useState } from "react";

const IND_I18N = globalThis.__IND_I18N__ || {};
const indT = (key, fallback) => (IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key]) || fallback || key;

// AudioRecorderMinimal
// Minimal UI recorder that produces a WAV (PCM 16-bit) blob.
// Notes:
// - Records mono audio and exports .wav.
// - Center button toggles record and pause/resume.
// - Right button stops and finalizes WAV while recording, or clears when idle.
// - Uses ScriptProcessor for simplicity (works for demos, but is deprecated).
// - Defensive error messages for common getUserMedia failures.
//
// Important constraint (Chrome): microphone capture requires a Secure Context.
// - Allowed: https://... or http://localhost
// - Blocked: http://intranet-host (unless corporate policy treats origin as secure)

const IND_BRAND = "#00296b";
const IND_BRAND_RGB = [0, 41, 107]; // #00296b

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

  // http + not localhost: normally blocked for mic.
  return true;
}

function formatTimeMs(ms) {
  // Always show mm:ss. Minutes keep increasing after 59.
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return `${mm}:${ss}`;
}

function floatTo16BitPCM(float32Array) {
  const out = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
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

// Self-tests for pure functions.
// Enable by setting: window.__IND_AUDIO_RECORDER_TESTS__ = true
function runSelfTests() {
  try {
    console.assert(formatTimeMs(0) === "00:00", "formatTimeMs(0) should be 00:00");
    console.assert(formatTimeMs(61_000) === "01:01", "formatTimeMs(61000) should be 01:01");
    console.assert(formatTimeMs(3_661_000) === "61:01", "formatTimeMs(3661000) should be 61:01");
    console.assert(formatTimeMs(3_600_000) === "60:00", "formatTimeMs(3600000) should be 60:00");
    console.assert(formatTimeMs(59_000) === "00:59", "formatTimeMs(59000) should be 00:59");
    console.assert(formatTimeMs(60_000) === "01:00", "formatTimeMs(60000) should be 01:00");

    const f = new Float32Array([0, 1, -1, 0.5, -0.5]);
    const pcm = floatTo16BitPCM(f);
    console.assert(pcm.length === 5, "PCM length should match input");
    console.assert(pcm[1] === 32767, "1.0 should map to 32767");
    console.assert(pcm[2] === -32768, "-1.0 should map to -32768");

    const wav = encodeWav({ samples16: new Int16Array([0, 1, -1]), sampleRate: 48000, numChannels: 1 });
    console.assert(wav && wav.type === "audio/wav", "WAV blob should be audio/wav");

    console.assert(brandRgba(0.5).startsWith("rgba("), "brandRgba should return rgba(...)");

    console.log("AudioRecorderMinimal self-tests: OK");
  } catch (e) {
    console.error("AudioRecorderMinimal self-tests: FAILED", e);
  }
}

export default function AudioRecorderMinimal({ embedded = false }) {
  const [canRecord, setCanRecord] = useState(false);
  const [uiError, setUiError] = useState("");
  const [uiHint, setUiHint] = useState("");

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [elapsedMs, setElapsedMs] = useState(0);
  const [wavBlob, setWavBlob] = useState(null);
  const [wavUrl, setWavUrl] = useState(null);
  const wavUrlRef = useRef(null);

  const audioElRef = useRef(null);
  const isMountedRef = useRef(false);

  const streamRef = useRef(null);
  const audioCtxRef = useRef(null);
  const sourceRef = useRef(null);
  const analyserRef = useRef(null);
  const processorRef = useRef(null);
  const zeroGainRef = useRef(null);

  const sampleRateRef = useRef(48000);
  const chunksRef = useRef([]);

  const startedAtRef = useRef(null);
  const accumulatedMsRef = useRef(0);
  const timerIdRef = useRef(null);

  const rafIdRef = useRef(null);
  const barsCanvasRef = useRef(null);

  const barWidthPx = 2;
  const barGapPx = 2;
  const barMinCount = 48;
  const barMaxCount = 120;

  const eqLastRef = useRef([]);

  const isRecordingRef = useRef(false);
  const isPausedRef = useRef(false);

  useEffect(() => {
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
          /* ignore */
        }
      }
    };
  }, []);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    wavUrlRef.current = wavUrl;
  }, [wavUrl]);

  useEffect(() => {
    const audioEl = audioElRef.current;
    if (!audioEl) return undefined;

    function onEnded() {
      setIsPlaying(false);
    }
    function onPause() {
      setIsPlaying(false);
    }
    function onPlay() {
      setIsPlaying(true);
    }

    audioEl.addEventListener("ended", onEnded);
    audioEl.addEventListener("pause", onPause);
    audioEl.addEventListener("play", onPlay);

    return () => {
      audioEl.removeEventListener("ended", onEnded);
      audioEl.removeEventListener("pause", onPause);
      audioEl.removeEventListener("play", onPlay);
    };
  }, []);

  useEffect(() => {
    if (isRecording && !isPaused) {
      startEqLoop();
    } else {
      stopEqLoop();
      drawEqIdle();
    }
  }, [isRecording, isPaused]);

  function safeSetState(fn) {
    if (!isMountedRef.current) return;
    fn();
  }

  function safeStopPlayback() {
    const audioEl = audioElRef.current;
    if (!audioEl) return;

    try {
      audioEl.pause();
      audioEl.currentTime = 0;
    } catch {
      /* ignore */
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
      safeSetState(() => {
        if (isHttpIntranetBlocked() && !isSecureContextSafe()) {
          setUiError(buildHttpMicBlockedMessage());
          const loc = getLocationSafe();
          if (loc) setUiHint(indT("AudioRecorder_Hint_Origin", "Current origin: {0}").replace("{0}", loc.origin));
        } else {
          setUiError(indT("AudioRecorder_Error_Unsupported", "Your browser does not support getUserMedia."));
        }
      });
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
        /* ignore */
      }
    }
    safeSetState(() => {
      setWavUrl(null);
      setWavBlob(null);
    });

    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCtor) throw new Error(indT("AudioRecorder_Error_NoAudioContext", "AudioContext is not available."));

      const audioCtx = new AudioContextCtor();
      audioCtxRef.current = audioCtx;
      sampleRateRef.current = audioCtx.sampleRate;

      try {
        await audioCtx.resume();
      } catch {
        /* ignore */
      }

      const source = audioCtx.createMediaStreamSource(stream);
      sourceRef.current = source;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.88;
      analyserRef.current = analyser;

      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      const zeroGain = audioCtx.createGain();
      zeroGain.gain.value = 0;
      zeroGainRef.current = zeroGain;

      processor.onaudioprocess = (e) => {
        if (!isRecordingRef.current || isPausedRef.current) return;
        const input = e.inputBuffer.getChannelData(0);
        chunksRef.current.push(new Float32Array(input));
      };

      source.connect(analyser);
      analyser.connect(processor);
      processor.connect(zeroGain);
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

      console.error("Audio recorder start failed:", err);
    }
  }

  function pauseRecording() {
    if (!isRecording) return;
    safeSetState(() => {
      setIsPaused(true);
    });
    pauseTimer();
  }

  function resumeRecording() {
    if (!isRecording) return;
    safeSetState(() => {
      setIsPaused(false);
    });
    startTimer();
  }

  function finishRecording() {
    if (!isRecording) return;

    pauseTimer();

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
    const wav = encodeWav({ samples16: samples16, sampleRate: sampleRateRef.current, numChannels: 1 });

    safeStopRecordingInternal({ keepWav: true, skipUiState: false });

    const url = URL.createObjectURL(wav);
    safeSetState(() => {
      setWavBlob(wav);
      setWavUrl(url);
    });
  }

  function clearRecording() {
    safeStopPlayback();
    safeStopRecordingInternal({ keepWav: false, skipUiState: false });

    if (wavUrlRef.current) {
      try {
        URL.revokeObjectURL(wavUrlRef.current);
      } catch {
        /* ignore */
      }
    }
    safeSetState(() => {
      setWavUrl(null);
      setWavBlob(null);
      setUiError("");
      setUiHint("");
    });

    chunksRef.current = [];
    resetTimer();
  }

  function safeStopRecordingInternal(args) {
    const keepWav = args.keepWav;
    const skipUiState = args.skipUiState;

    stopEqLoop();
    if (!keepWav) resetTimer();

    try {
      if (processorRef.current) processorRef.current.disconnect();
      if (analyserRef.current) analyserRef.current.disconnect();
      if (sourceRef.current) sourceRef.current.disconnect();
      if (zeroGainRef.current) zeroGainRef.current.disconnect();
    } catch {
      /* ignore */
    }

    try {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") audioCtxRef.current.close();
    } catch {
      /* ignore */
    }

    try {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        for (let i = 0; i < tracks.length; i++) tracks[i].stop();
      }
    } catch {
      /* ignore */
    }

    processorRef.current = null;
    analyserRef.current = null;
    sourceRef.current = null;
    zeroGainRef.current = null;
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
      /* ignore */
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

      ctx.fillStyle = brandRgba(0.10);
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
        const idx = Math.floor((i / count) * freq.length);
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
      const v = 0.18 + (i % 9) * 0.01;
      const barH = Math.max(2, Math.floor(v * maxH));

      const x = startX + i * (barW + gap);
      const y = Math.floor((h - barH) / 2);

      ctx.fillStyle = brandRgba(0.16);
      ctx.fillRect(x, y, barW, barH);
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

  const centerLabel = !isRecording
    ? indT("AudioRecorder_Record", "Record")
    : isPaused
      ? indT("AudioRecorder_Resume", "Resume")
      : indT("AudioRecorder_Pause", "Pause");

  const timerText = formatTimeMs(elapsedMs);

  const isActiveRec = isRecording && !isPaused;
  const statusText = uiError
    ? ""
    : isActiveRec
      ? indT("AudioRecorder_Status_Recording", "Recording")
      : isPaused
        ? indT("AudioRecorder_Status_Paused", "Paused")
        : wavUrl
          ? indT("AudioRecorder_Status_ReadyToPlay", "Ready to play")
          : indT("AudioRecorder_Status_Ready", "Ready");

  const timerAlpha = isActiveRec ? 0.55 : isPaused ? 0.46 : 0.40;
  const statusAlpha = 0.35;
  const cardBg = "radial-gradient(700px circle at 18% 0%, rgba(0, 41, 107, 0.06), transparent 55%)";

  const outerClassName = embedded
    ? "w-full flex justify-center"
    : "w-full min-h-[280px] flex items-center justify-center p-4 sm:p-6";

  const outerStyle = embedded
    ? undefined
    : {
        backgroundImage: "radial-gradient(900px circle at 20% 20%, rgba(0, 41, 107, 0.08), transparent 60%)",
        backgroundColor: "rgba(0, 41, 107, 0.05)",
        fontFamily: '"Montserrat", sans-serif',
      };

  return (
    <div className={outerClassName} style={outerStyle}>
      <div
        className="w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[520px] rounded-xl sm:rounded-2xl bg-white border shadow-xl"
        style={{ borderColor: "rgba(0, 41, 107, 0.18)", backgroundImage: cardBg }}
      >
        <div className="px-5 sm:px-7 pt-5 sm:pt-6">
          <div className="flex items-center justify-center">
            <canvas ref={barsCanvasRef} className="w-full h-16 sm:h-20" />
          </div>

          <div className="mt-3 flex items-center justify-end">
            <div
              className="font-light italic tabular-nums text-[22px] sm:text-[24px] leading-none tracking-[0.18em]"
              style={{ color: brandRgba(timerAlpha) }}
            >
              {timerText}
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-7 pb-5 sm:pb-6 pt-4 sm:pt-5">
          <div className="flex items-center justify-center gap-6 sm:gap-8">
            <button
              type="button"
              onClick={togglePlay}
              disabled={!wavUrl}
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border flex items-center justify-center transition shadow-sm hover:shadow-md active:scale-95"
              style={{
                borderColor: wavUrl ? "rgba(0, 41, 107, 0.22)" : "rgba(0, 41, 107, 0.18)",
                backgroundColor: wavUrl ? "rgba(0, 41, 107, 0.06)" : "rgba(0, 41, 107, 0.04)",
                opacity: wavUrl ? 1 : 0.45,
                cursor: wavUrl ? "pointer" : "not-allowed",
              }}
              aria-label={indT("AudioRecorder_Play", "Play")}
              title={wavUrl ? (isPlaying ? indT("AudioRecorder_Pause", "Pause") : indT("AudioRecorder_Play", "Play")) : indT("AudioRecorder_NoAudio", "No audio")}
            >
              {isPlaying ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: IND_BRAND }}>
                  <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
                  <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: IND_BRAND }}>
                  <path d="M9 7L19 12L9 17V7Z" fill="currentColor" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={onCenterClick}
              disabled={!canRecord}
              className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border flex items-center justify-center transition shadow-sm hover:shadow-md active:scale-95"
              style={{
                borderColor: "rgba(0, 41, 107, 0.18)",
                backgroundColor: canRecord ? "rgba(0, 41, 107, 0.06)" : "rgba(0, 41, 107, 0.04)",
                boxShadow: isActiveRec
                  ? "0 0 0 7px rgba(0, 41, 107, 0.08), 0 14px 34px rgba(0, 41, 107, 0.14)"
                  : "0 10px 22px rgba(0, 41, 107, 0.08)",
                opacity: canRecord ? 1 : 0.45,
                cursor: canRecord ? "pointer" : "not-allowed",
              }}
              aria-label={centerLabel}
              title={centerLabel}
            >
              {!isRecording ? (
                <span className="h-5 w-5 rounded-full bg-red-500" />
              ) : isPaused ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: IND_BRAND }}>
                  <path d="M9 7L19 12L9 17V7Z" fill="currentColor" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: IND_BRAND }}>
                  <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
                  <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={onRightClick}
              disabled={!isRecording && !wavBlob}
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border flex items-center justify-center transition shadow-sm hover:shadow-md active:scale-95"
              style={{
                borderColor: isRecording ? "rgba(0, 41, 107, 0.22)" : "rgba(0, 41, 107, 0.18)",
                backgroundColor: isRecording ? "rgba(0, 41, 107, 0.06)" : "rgba(0, 41, 107, 0.04)",
                opacity: isRecording || wavBlob ? 1 : 0.45,
                cursor: isRecording || wavBlob ? "pointer" : "not-allowed",
              }}
              aria-label={isRecording ? indT("AudioRecorder_Stop", "Stop") : indT("AudioRecorder_Cancel", "Cancel")}
              title={isRecording ? indT("AudioRecorder_Stop", "Stop") : indT("AudioRecorder_Cancel", "Cancel")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: IND_BRAND }}>
                <rect x="7" y="7" width="10" height="10" rx="1" fill="currentColor" />
              </svg>
            </button>
          </div>

          <audio ref={audioElRef} src={wavUrl || undefined} className="hidden" />

          <div className="mt-4 flex flex-col items-center justify-center gap-1 min-h-[34px]">
            {uiError ? (
              <>
                <div className="text-xs text-rose-700 text-center">{uiError}</div>
                {uiHint ? (
                  <div className="text-[11px] text-slate-600 text-center">{uiHint}</div>
                ) : null}
              </>
            ) : (
              <div className="text-xs" style={{ color: brandRgba(statusAlpha) }}>
                {statusText}
              </div>
            )}
          </div>

          {/* TODO: In future phases, expose download link and/or upload to backend. */}
        </div>
      </div>
    </div>
  );
}
