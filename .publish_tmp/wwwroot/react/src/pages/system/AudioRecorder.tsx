import React from "react";
import { createRoot } from "react-dom/client";
import AudioRecorderMinimal from "./AudioRecorderMinimal.tsx";

type IndRootElement = HTMLElement & { __indRoot?: import("react-dom/client").Root };

// Mount the audio recorder into the Razor view root.
export const mountAudioRecorder = () => {
  const el = document.getElementById("ind-audio-recorder-root") as IndRootElement | null;
  if (!el) return;

  const element = <AudioRecorderMinimal />;

  if (el.__indRoot) {
    el.__indRoot.render(element);
    return;
  }

  const root = createRoot(el);
  el.__indRoot = root;
  root.render(element);
};

export default AudioRecorderMinimal;
