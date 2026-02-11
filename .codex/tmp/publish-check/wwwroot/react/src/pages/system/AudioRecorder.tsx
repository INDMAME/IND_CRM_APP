import React from "react";
import AudioRecorderMinimal from "./AudioRecorderMinimal.tsx";
import { mountReactIsland, mountWhenDocumentReady } from "../../utils/reactIsland.tsx";

// Mount the audio recorder into the Razor view root.
export const mountAudioRecorder = () => {
  const el = document.getElementById("ind-audio-recorder-root");
  if (!el) return;

  mountReactIsland(el, <AudioRecorderMinimal />);
};

// Auto-mount when the page bundle loads.
const mount = () => {
  mountAudioRecorder();
};

mountWhenDocumentReady(mount);

export default AudioRecorderMinimal;
