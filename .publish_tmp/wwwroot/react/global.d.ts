export {};

declare global {
  interface Window {
    __IND_I18N__?: Record<string, string>;
    __IND_PERMISSION_I18N__?: {
      title?: string;
      message?: string;
      ok?: string;
    };
    __IND_MODULE_ACCESS__?: Record<string, number>;
    __IND_SELECTED_COMPANY__?: string;
    __VISIT_TYPES__?: unknown[];
    __ASISTENTE_TIPOS__?: unknown[];
    __ACTIVITY_DETAIL__?: unknown;
    __IND_AUDIO_RECORDER_TESTS__?: boolean;
    __indShowGlobalSpinner?: (message?: string) => void;
    __indHideGlobalSpinner?: () => void;
    __indAllowHistoryOnce?: () => void;
    IND?: {
      showPermissionModal?: (opts?: any) => void;
    };
  }

  interface GlobalThis {
    __IND_I18N__?: Record<string, string>;
    __IND_PERMISSION_I18N__?: {
      title?: string;
      message?: string;
      ok?: string;
    };
    __IND_MODULE_ACCESS__?: Record<string, number>;
    __IND_SELECTED_COMPANY__?: string;
    __VISIT_TYPES__?: unknown[];
    __ASISTENTE_TIPOS__?: unknown[];
    __ACTIVITY_DETAIL__?: unknown;
  }
}
