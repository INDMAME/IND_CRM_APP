import { useEffect, useState } from "react";

const CALLOUT_ROTATION_MS = 7000;

type UseHomeHelpCalloutArgs = {
  messages: string[];
  paused: boolean;
};

// Rotates local callout copy while respecting visibility and reduced-motion preferences.
export const useHomeHelpCallout = ({ messages, paused }: UseHomeHelpCalloutArgs): string => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [documentHidden, setDocumentHidden] = useState(() =>
    typeof document !== "undefined" ? document.hidden : false
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => setDocumentHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (messages.length < 2 || paused || documentHidden || reducedMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length);
    }, CALLOUT_ROTATION_MS);

    return () => window.clearInterval(intervalId);
  }, [documentHidden, messages.length, paused, reducedMotion]);

  if (messages.length === 0) {
    return "";
  }

  return messages[reducedMotion ? 0 : messageIndex % messages.length] || messages[0];
};
