import React from "react";
import { createRoot } from "react-dom/client";
import AudioRecorderMinimal from "./AudioRecorderMinimal.jsx";

// Mount AudioRecorderMinimal into the Razor view.
const mount = () => {
  const el = document.getElementById("ind-audio-recorder-root");
  if (!el) return;
  createRoot(el).render(<AudioRecorderMinimal />);
};

if (document.readyState === "complete" || document.readyState === "interactive") {
  mount();
} else {
  document.addEventListener("DOMContentLoaded", mount);
}

