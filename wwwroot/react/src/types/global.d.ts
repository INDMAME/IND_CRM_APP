export {};

declare global {
  interface Window {
    __IND_I18N__?: Record<string, string>;
    __IND_PERMISSION_I18N__?: { title?: string; message?: string; ok?: string };
    __IND_AUDIO_RECORDER_TESTS__?: boolean;
    __VISIT_TYPES__?: Array<{ value?: string; Value?: string }>;
    __ASISTENTE_TIPOS__?: Array<{ value?: string; Value?: string }>;
    __ACTIVITY_DETAIL__?: Record<string, unknown>;
    __indAllowHistoryOnce?: (fallbackUrl?: string) => void;
    __indShowGlobalSpinner?: (message?: string) => void;
    __indHideGlobalSpinner?: () => void;
    IND?: {
      showPermissionModal?: (opts?: Record<string, unknown>) => void;
      flashActionMark?: (payload: { type: string; durationMs: number }) => void;
    };
    webkitAudioContext?: typeof AudioContext;
  }

  interface GlobalThis {
    __IND_I18N__?: Record<string, string>;
  }
}
